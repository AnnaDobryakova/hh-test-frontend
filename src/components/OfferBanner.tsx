// import { Tariff } from "@/types/tariff";
// import { formatPrice, getDiscountPercent } from "@/lib/utils";

// type ForeverBlockProps = {
//   tariff: Tariff;
//   expired: boolean;
//   selected: boolean;
//   onSelect: (id: string) => void;
// };

// export default function ForeverBlock({
//   tariff,
//   expired,
//   selected,
//   onSelect,
// }: ForeverBlockProps) {
//   const discount = getDiscountPercent(tariff.full_price, tariff.price);
//   const currentPrice = expired ? tariff.full_price : tariff.price;

//   return (
//     <button
//       type="button"
//       className={`main_block_forever ${selected ? "main_block_forever_selected" : ""}`}
//       onClick={() => onSelect(tariff.id)}
//     >
//       <div className="main_block_forever_top_items">
//         {!expired ? (
//           <p className="main_block_forever_top_item_70">-{discount}%</p>
//         ) : (
//           <p className="main_block_forever_top_item_70 main_block_forever_top_item_70_disabled">
//             без скидки
//           </p>
//         )}
//         <p className="main_block_forever_top_item_hit">хит!</p>
//       </div>

//       <div className="main_block_forever_left_items">
//         <div className="main_block_forever_left_item_block">
//           <h4>{tariff.period}</h4>

//           <div className="main_block_forever_left_items_price">
//             <p className="main_block_forever_left_item_price">
//               {formatPrice(currentPrice)}
//             </p>

//             {!expired ? (
//               <span className="price_fade_out">{formatPrice(tariff.full_price)}</span>
//             ) : (
//               <span className="price_expired_label">Скидка завершена</span>
//             )}
//           </div>
//         </div>

//         <div className="main_block_forever_right_item">
//           <p className="main_block_forever_right_item_text">{tariff.text}</p>
//         </div>
//       </div>
//     </button>
//   );
// }


import { Tariff } from "@/types/tariff";
import { formatPrice, getDiscountPercent } from "@/lib/utils";

type ForeverBlockProps = {
  tariff: Tariff;
  expired: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function OfferBanner({
  tariff,
  expired,
  selected,
  onSelect,
}: ForeverBlockProps) {
  const discount = getDiscountPercent(tariff.full_price, tariff.price);
  const currentPrice = expired ? tariff.full_price : tariff.price;

  return (
    <button
      type="button"
      className={`main_block_forever ${selected ? "main_block_forever_selected" : ""}`}
      onClick={() => onSelect(tariff.id)}
    >
      <div className="main_block_forever_top_items">
        {!expired ? (
          <p className="main_block_forever_top_item_70">-{discount}%</p>
        ) : (
          <p className="main_block_forever_top_item_70 main_block_forever_top_item_70_disabled">
            без скидки
          </p>
        )}
        <p className="main_block_forever_top_item_hit">хит!</p>
      </div>

      <div className="main_block_forever_left_items">
        <div className="main_block_forever_left_item_block">
          <h4>{tariff.period}</h4>

          <div className="main_block_forever_left_items_price">
            <p className="main_block_forever_left_item_price">
              {formatPrice(currentPrice)}
            </p>

            {!expired ? (
              <span className="price_fade_out">{formatPrice(tariff.full_price)}</span>
            ) : (
              <span className="price_expired_label">{formatPrice(tariff.full_price)}</span>
            )}
          </div>
        </div>

        <div className="main_block_forever_right_item">
          <p className="main_block_forever_right_item_text">{tariff.text}</p>
        </div>
      </div>
    </button>
  );
}