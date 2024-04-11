"use client";
import React from "react";
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import { useUser } from "@/features/UserContext/ui/UserProvider";
import Input from "@/shared/ui/Input/Input";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import Link from "next/link";
import Logo from "@/shared/ui/Icons/Logo/Logo";
import Search from "@/shared/ui/Icons/Search/Search";

interface HeaderProps {
  isProfile: boolean;
  isHouse?: boolean;
}

const options = [
  "Личные данные",
  "Счет и платежи",
  "Мои объявление",
  "Центр помощи",
  "Выйти",
];

export default function HeaderLandlord() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");
    const decodedToken = jwt.decode(accessToken);
    console.log(decodedToken);
    const userId = decodedToken?.user_id;

    const fetchName = async () => {
      try {
        const userResponse = await fetch(
          `http://195.49.212.131:8000/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();

        setName(user.full_name);
        console.log(user);
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchName();
  }, []);

  const handleLoginClick = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={cn("border-b-[1px] border-[#534949] py-[30px]")}>
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex gap-[2px]">
            <Search />
            <Input
              className="text-md text-primary border-primary border-b-[2px] py-[2px] px-[4px]"
              placeholder="Поиск квартиры"
            />
          </div>

          <div className="flex gap-[40px]">
            {!user && (
              <div className="flex gap-[40px] items-center">
                <Link href={"/routs/chat"}>
                  <Button className="text-md font-[500]" label="Сообщение" />
                </Link>
                <Link href={"/routs/posthouse"}>
                  <Button
                    className="text-md font-[500] border-[1px] border-black py-[3px] px-[6px]"
                    label="Разместить объявление"
                  />
                </Link>
              </div>
            )}

            {user ? (
              <Dropdown
                buttonStyle="text-md font-[500]"
                listStyle="bg-white text-base py-[14px] px-[45px] flex flex-col border-white rounded-[6px] gap-[13px] w-[210px] h-fit"
                options={options}
                label={name || "Name"}
                onClick={handleLogout}
              />
            ) : (
              <Button
                className="text-md font-[500]"
                label="Войти"
                onClick={handleLoginClick}
              />
            )}
          </div>
        </nav>
      </div>
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
}