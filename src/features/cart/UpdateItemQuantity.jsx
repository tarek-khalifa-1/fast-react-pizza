import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { getCurrentQuantityById, updateQuantity } from "./cartSlice";
import TrashIcon from "../../ui/TrashIcon";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(updateQuantity(pizzaId, "dec"))}
      >
        {currentQuantity === 1 ? <TrashIcon /> : "-"}
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(updateQuantity(pizzaId, "inc"))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
