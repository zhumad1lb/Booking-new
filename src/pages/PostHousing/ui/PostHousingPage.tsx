"use client";
import { useState } from "react";
import Arrow from "@/shared/ui/Icons/Arrow/Arrow";
import Link from "next/link";
import { data, data2 } from "./data/data";
import Button from "@/shared/ui/Button/Button";

export default function PostHousePage() {
  const [isChecked, setIsChecked] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    setValidationError("");
  };

  const handleContinueClick = () => {
    if (!isChecked) {
      setValidationError(
        "Вы должны принять условия использования и политику конфиденциальности."
      );
    } else {
      console.log("error");
    }
  };

  return (
    <section className="py-[30px] pb-[74px]">
      <Link href={"/"} className="flex gap-1 items-center mb-[65px]">
        <Arrow />
        <p className="text-md font-[500]">Вернуться на главное меню</p>
      </Link>
      <div className="flex gap-[183px] items-center">
        <div className="left__post mb-[65px]">
          <h1 className="text-[36px] w-[120%] font-medium">
            Сдать жилье на StudHouse.kz
          </h1>
        </div>
        <div className="left__post">
          <h1 className="text-[15px] mb-5">Правила пользования сайтом</h1>
          <p className="text-[15px]">
            Добро пожаловать на StudHouse.kz! Мы предлагаем платформу для
            арендодателей, желающих сдать свое жилье. Пожалуйста, внимательно
            ознакомьтесь с данными правилами, так как они определяют ваши права
            и обязанности при использовании нашего сайта.
          </p>
          <ul className="list-decimal mt-[18px] mb-[18px] pl-5">
            {data.map(({ text_span, text }, index) => (
              <li className="text-[15px]" key={index}>
                <span className="text-md font-medium">{text_span}</span> {text}
              </li>
            ))}
          </ul>
          <h3 className="text-[15px] mb-[18px]">Политика конфиденциальности</h3>
          <p className="text-[15px]">
            Ваша конфиденциальность важна для нас. Наша политика
            конфиденциальности описывает, как мы собираем, используем и защищаем
            вашу личную информацию.
          </p>
          <ul className="list-decimal mt-[1rem] pl-5">
            {data2.map(({ text_span, text }, index) => (
              <li className="text-[15px]" key={index}>
                <span className="text-[15px] font-medium">{text_span}</span>{" "}
                {text}
              </li>
            ))}
          </ul>
          <label className="flex items-center gap-2 mt-[1rem]">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              onChange={handleCheckboxChange}
            />
            <p className="text-[15px]">
              Я прочитал(а) и соглашаюсь с Условиями использования и Политикой
              конфиденциальности сайта StudHouse.kz. Я понимаю, что моя личная
              информация будет использоваться в соответствии с этими
              документами.
            </p>
          </label>
          {validationError && (
            <p className="text-red-500 text-[15px] mt-2">{validationError}</p>
          )}
          <div className="flex justify-end">
            <Link href={'/routs/postsettlement'}>
              <Button
                label="Продолжить"
                onClick={handleContinueClick}
                className="rounded-[5px] text-center text-white bg-blue text-[15px] font-medium mt-[33px] p-[1rem]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
