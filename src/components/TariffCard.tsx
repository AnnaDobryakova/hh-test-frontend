import { Tariff } from "@/types/tariff";
import { formatPrice, getDiscountPercent } from "@/lib/utils";

type TariffCardProps = {
  tariff: Tariff;
  expired: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function TariffCard({
  tariff,
  expired,
  selected,
  onSelect,
}: TariffCardProps) {
  const discount = getDiscountPercent(tariff.full_price, tariff.price);
  const currentPrice = expired ? tariff.full_price : tariff.price;

  return (
    <button
      type="button"
      className={`tariffCard ${selected ? "tariffCard_selected" : ""}`}
      onClick={() => onSelect(tariff.id)}
    >
      <div className="tariffCard_top">
        {!expired ? (
          <p className="main_block_forever_top_item_70">-{discount}%</p>
        ) : (
          <p className="main_block_forever_top_item_70 main_block_forever_top_item_70_disabled">
            без скидки
          </p>
        )}
      </div>

      <div className="tariffCard_content">
        <div className="tariffCard_left">
          <h4>{tariff.period}</h4>

          <div className="tariffCard_price_block">
            <p className="tariffCard_price">{formatPrice(currentPrice)}</p>

            {!expired ? (
              <span className="tariffCard_full_price">
                {formatPrice(tariff.full_price)}
              </span>
            ) : (
              <span className="price_expired_label">
                {formatPrice(tariff.full_price)}
              </span>
            )}
          </div>
        </div>

        <div className="tariffCard_right">
          <p>{tariff.text}</p>
        </div>
      </div>
    </button>
  );
}