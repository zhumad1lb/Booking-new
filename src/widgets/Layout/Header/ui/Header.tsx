"use client"
import React from "react";
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import { useUser } from "@/features/UserContext/ui/UserProvider";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import Link from "next/link";
import Logo from "@/shared/ui/Icons/Logo/Logo";

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

export default function Header({ isProfile, isHouse }: HeaderProps) {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    <header className={cn("py-[30px]", { "border-b-black": isProfile })}>
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          {!user && (
            <div className="flex gap-[40px]">
              {!isProfile && (
                <Button
                  className="text-md font-[500]"
                  label="Сообщения "
                  onClick={handleLoginClick}
                />
              )}
              {!isProfile && (
                <Link href={"/routs/posthouse"}>
                  <Button
                    className="text-md font-[500] border border-[1px] border-black py-[3px] px-[6px]"
                    label="Разместить объявление"
                  />
                </Link>
              )}
              <Button
                className="text-md font-[500]"
                label="Войти"
                onClick={handleLoginClick}
              />
            </div>
          )}
          {user && (
            <div className="flex gap-[40px]">
              {!isProfile && (
                <Button className="text-md font-[500]" label="Сообщения " />
              )}
              {!isProfile && (
                <>
                  <Link href={"/routs/posthouse"}>
                    <Button
                      className="text-md font-[500] border-[1px] border-black py-[3px] px-[6px]"
                      label="Разместить объявление"
                    />
                  </Link>
                  <Button
                  label={user.login}
                  />
                </>
              )}
              <Dropdown
                buttonStyle="text-md font-[500]"
                listStyle="bg-white text-base py-[14px] px-[45px] flex flex-col border-white rounded-[6px] gap-[13px] w-[210px] h-fit"
                options={options}
                label={user.login}
                onClick={handleLogout}
              />
            </div>
          )}
        </nav>
      </div>
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
}

