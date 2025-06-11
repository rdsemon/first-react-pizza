import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "mt-3 inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-900 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const style = {
    primary: base + " px-3 py-2 md:px-4 md:py-3 ",
    small: base + " px-3 py-2 text-sm",
    secondary:
      "px-3 py-2 md:px-4 md:py-3 mt-3 inline-block rounded-full border border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300  hover:text-stone-900 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed focus:text-stone-900",
    round: base + "px-2.5 py-1 text-sm md:px-3 py-1",
  };

  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} onClick={onClick} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
