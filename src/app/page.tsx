"use client";

import { useEffect, useMemo, useState } from "react";
import OfferBanner from "@/components/OfferBanner";
import TariffCard from "@/components/TariffCard";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import { Tariff } from "@/types/tariff";
import { getTimerString } from "@/lib/utils";
import { getTariffs } from "@/lib/api";

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedTariffId, setSelectedTariffId] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(960);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTariffs() {
      try {
        const data = await getTariffs();
        setTariffs(data);

        const bestTariff = data.find((item) => item.is_best);
        if (bestTariff) {
          setSelectedTariffId(bestTariff.id);
        } else if (data.length > 0) {
          setSelectedTariffId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTariffs();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const expired = timeLeft <= 0;
  const isDanger = timeLeft > 0 && timeLeft <= 30;

  const mainTariff = useMemo(() => {
    const best = tariffs.find((item) => item.is_best);
    return best ?? tariffs[0];
  }, [tariffs]);

  const otherTariffs = useMemo(() => {
    return tariffs.filter((item) => !item.is_best).slice(0, 3);
  }, [tariffs]);

  function handleBuy() {
    if (!checkboxChecked) {
      setCheckboxError(true);
      return;
    }

    setCheckboxError(false);

    const selectedTariff = tariffs.find((item) => item.id === selectedTariffId);
    alert(`Вы выбрали тариф: ${selectedTariff?.period ?? "не выбран"}`);
  }

  return (
    <>
      <header className="header">
        <h5>Успейте открыть пробную неделю</h5>

        <div className={`header_block ${isDanger ? "header_block_danger" : ""}`}>
          <img src="/star.svg" alt="star" width={14} height={14} />
          <p>{getTimerString(timeLeft)}</p>
          <img src="/star.svg" alt="star" width={14} height={14} />
        </div>
      </header>

      <main className="main">
        <section className="main_wrapper">
          <h3>
            Выбери подходящий для себя <span>тариф</span>
          </h3>

          {loading ? (
            <p className="loading_text">Загрузка тарифов...</p>
          ) : (
            <>
              <section className="main_block">
                <img
                  className="main_block_image"
                  src="/man.png"
                  alt="Men"
                  width={380}
                  height={767}
                />

                <div className="main_block_items">
                  {mainTariff && (
                    <OfferBanner
                      tariff={mainTariff}
                      expired={expired}
                      selected={selectedTariffId === mainTariff.id}
                      onSelect={setSelectedTariffId}
                    />
                  )}

                  <div className="main_block_items_cards">
                    {otherTariffs.map((tariff) => (
                      <TariffCard
                        key={tariff.id}
                        tariff={tariff}
                        expired={expired}
                        selected={selectedTariffId === tariff.id}
                        onSelect={setSelectedTariffId}
                      />
                    ))}
                  </div>

                  <div className="main_block_note">
                    <span>!</span>
                    <p>
                      Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
                      результат, чем за 1 месяц
                    </p>
                  </div>

                  <label
                    className={`main_block_checkbox ${
                      checkboxError ? "main_block_checkbox_error" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checkboxChecked}
                      onChange={(e) => {
                        setCheckboxChecked(e.target.checked);
                        if (e.target.checked) {
                          setCheckboxError(false);
                        }
                      }}
                    />
                    <p>
                      Я согласен с офертой рекуррентных платежей и Политикой
                      конфиденциальности
                    </p>
                  </label>

                  <button className="main_block_button" onClick={handleBuy}>
                    Купить
                  </button>

                  <p className="main_block_bottom_text">
                    Нажимая кнопку «Купить», Пользователь соглашается на разовое
                    списание денежных средств для получения пожизненного доступа к
                    приложению. Пользователь соглашается, что данные кредитной /
                    дебетовой карты будут сохранены для осуществления покупок
                    дополнительных услуг сервиса в случае желания пользователя.
                  </p>
                </div>
              </section>

              <GuaranteeBlock />
            </>
          )}
        </section>
      </main>
    </>
  );
}