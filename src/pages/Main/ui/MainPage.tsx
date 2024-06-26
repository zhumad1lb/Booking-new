"use client";
import Input from "@/shared/ui/Input/Input";
import ProductList from "@/widgets/productList/ui/productLIst";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import styles from "./styles.module.scss";
import Button from "@/shared/ui/Button/Button";
import AuthModal from "@/features/AuthModal/ui/AuthModal";
import Link from "next/link";
import Modal from "@/shared/ui/Modal/ui/Modal";
import { BASE_URL } from "@/shared/api/BASE";

const dataFilter = [
  { text: "Срок аренды", className: "mb-[42px]" },
  { text: "Удобство", className: "mb-[70px]" },
  { text: "Площадь, м2", className: "mb-[47px]" },
  { text: "Санузел", className: "mb-10" },
  { text: "Ремонт", className: "mb-[30px]" },
  { text: "Этаж", className: "mb-7" },
  { text: "Год постройки", className: "mb-[30px]" },
  { text: "Тип дома", className: "mb-[67px]" },
  { text: "До метро", className: "" },
];

const dataU = [
  { text: "Кондиционер" },
  { text: "Холодильник" },
  { text: "Стиральная машина" },
  { text: "Мебель" },
  { text: "Кровать" },
  { text: "Кухонная мебель" },
  { text: "Интернет" },
  { text: "Телевизор" },
  { text: "Балкон" },
];

export default function LandLord() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const { data: res } = await axios.get(`${BASE_URL}/advertisement`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        console.log(res);
        setData(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const recordsPerPage = 6;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    setActive(true);
    window.history.pushState({}, "", `/?page=${page}`);
  };

  const onFilterClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="pb-[45px]">
      <div className={`${styles.imgbg} flex`}>
        <div className=" py-[128px] flex flex-col items-start w-full">
          <div className="container flex flex-col">
            <span className="text-2xl mb-[1rem] font-semibold text-primary">
              Создай себе идеальное <br /> окружение
            </span>
            <Link href={"/routs/posthouse"} className="">
              <Button
                className="border-[1px] flex items-center px-[10rem] justify-center border-black rounded-[10px] text-center bg-white text-[20px]"
                label="Добавить объявление"
              >
                <span className="text-[45px] mr-[1rem] font-semibold text-center">
                  +
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-[50px] flex items-center  gap-[100px] mb-[60px]">
        <div className="flex items-center gap-2">
          <Image src={"/Search.png"} width={29} height={29} alt="search" />
          <Input
            placeholder="Выбор"
            className="search-input pb-[5px] text-black text-md"
          />
        </div>
        <div className="flex gap-[30px] items-center">
          <div className="flex gap-[5px] items-center">
            <span className="text-md text-black font-medium">Макс. оплата</span>
            <span className="-rotate-90">
              <Arrow />
            </span>
          </div>
          <div className="flex gap-[15px]">
            <span className="text-md text-black font-medium items-center">
              Кол. комнат
            </span>
            <span className="-rotate-90">
              <Arrow />
            </span>
          </div>
          <h3
            className="text-md font-medium cursor-pointer text-black"
            onClick={onFilterClick}
          >
            Фильтр
          </h3>
        </div>
      </div>
      <div className="container grid grid-cols-2 gap-[92px] mb-12">
        <ProductList records={records} />
      </div>
      <div className="container flex gap-4 items-center justify-center">
        {numbers.map((n, i) => (
          <div
            className={`py-2 px-4 cursor-pointer text-md rounded-[6px] ${
              current === n ? "bg-blue text-white" : "bg-white text-black"
            }`}
            key={i}
            onClick={() => changeCurrentPage(n)}
          >
            {n}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex justify-center gap-[90px]">
            <div className="flex flex-col gap-[0.8rem]">
              {dataFilter.map(({ text, className }, index) => (
                <h1
                  className={className}
                  style={{ fontSize: "20px", fontWeight: "500" }}
                  key={index}
                >
                  {text}
                </h1>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-[38px]">
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Неважно
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  На несколько месяцев
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  От года
                </Button>
              </div>
              <div className="grid grid-cols-3 mb-[25px]">
                {dataU.map(({ text }, index) => (
                  <label className="flex items-center gap-[5px]" key={index}>
                    <Input type="checkbox" className="w-3 h-3" />
                    <span className="text-md">{text}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-8 mb-[38px]">
                <div className="flex gap-3 items-center">
                  <span className="text-md">Общая</span>
                  <div className="rounded-[5px] flex flex-nowrap w-full border-[0.2px] border-solid border-black">
                    <Input
                      placeholder="от"
                      className="border-r-[0.1px] py-[6px] px-3 w-12 text-center border-black border-solid"
                    />
                    <Input
                      placeholder="до"
                      className="text-center py-[6px] px-3 w-12"
                    />
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-md">Кухня</span>
                  <div className="rounded-[5px] flex flex-nowrap w-full border-[0.2px] border-solid border-black">
                    <Input
                      placeholder="от"
                      className="border-r-[0.1px] py-[6px] px-3 w-12 text-center border-black border-solid"
                    />
                    <Input
                      placeholder="до"
                      className="text-center py-[6px] px-3 w-12"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 mb-[31px]">
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Неважно
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Совмещенный
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Раздельный
                </Button>
              </div>
              <div className="flex items-center gap-2.5 mb-[31px]">
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Неважно
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Евроремонт
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Дизайнерский
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Космический
                </Button>
              </div>
              <div className="flex gap-8 mb-[19px]">
                <div className="rounded-[5px] flex-nowrap w-[15%] border-[0.2px] border-solid border-black">
                  <Input
                    placeholder="от"
                    className="border-r-[0.1px] py-[6px] px-3 w-12 text-center border-black border-solid"
                  />
                  <Input
                    placeholder="до"
                    className="text-center py-[6px] px-3 w-12"
                  />
                </div>
                <label className="flex items-center gap-[5px]">
                  <Input type="checkbox" className="w-3 h-3" />
                  <span className="whitespace-nowrap text-md">Не первый</span>
                </label>
                <label className="flex items-center gap-[5px]">
                  <Input type="checkbox" className="w-3 h-3" />
                  <span className="whitespace-nowrap text-md">
                    Не последний
                  </span>
                </label>
              </div>
              <div className="mb-[21px]">
                <div className="rounded-[5px] flex-nowrap w-[15%] border-[0.2px] border-solid border-black">
                  <Input
                    placeholder="от"
                    className="border-r-[0.1px] py-[6px] px-3 w-12 text-center border-black border-solid"
                  />
                  <Input
                    placeholder="до"
                    className="text-center py-[6px] px-3 w-12"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Неважно
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Евроремонт
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Дизайнерский
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Космический
                </Button>
              </div>
              <div className="flex items-center gap-2.5 mb-[22px]">
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Неважно
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Евроремонт
                </Button>
                <Button className="text-md whitespace-nowrap bg-white border-[0.2px] border-solid border-black rounded-[5px] p-2">
                  Дизайнерский
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span>Не более</span>
                <div className="border-[0.2px] rounded-[5px] p-2 w-[9%] border-black border-solud">
                  <Input className="w-full text-center" />
                </div>
                <span>минут</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
