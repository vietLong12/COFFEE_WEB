import "./newItem.css";

const NewItem = () => {
  const img =
    "https://bizweb.dktcdn.net/100/451/095/articles/t6.jpg?v=1648451454637";
  const title =
    "Sở thích uống cà phê tiết lộ bí mật động trời về tính cách của bạn";
  const text =
    "Hãy nói cho tôi loại cà phê mà bạn hay uống, tôi sẽ nói cho bạn biết bạn là người như thế nào”. Chỉ với...";
  return (
    <div className="w-full relative rounded">
      <img src={img} alt="" className="relative rounded w-full" />
      <div className="w-full h-fit absolute bottom-0 left-0 bg-opacity-60 bg-black text-white px-4 py-2 rounded">
        <h5 className="truncate font-bold text-2xl mb-2">{title}</h5>
        <p className="line-clamp-2 text mb-1">{text}</p>
        <a href="#" className="uppercase underline underline-offset-4 text-lg">Xem tất cả</a>
      </div>
    </div>
  );
};

export default NewItem;
