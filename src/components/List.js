import "../App.css";

export default function List({ data: { items, total_count } }) {
  return (
    <>
      <h1>Total: {total_count}</h1>
      {items.map((item) => (
        <div key={item.id} className="item">
          <p>{JSON.stringify(item.login)}</p>
          <img alt="avatar" src={item.avatar_url}></img>
          <p>{item.followers_url}</p>
        </div>
      ))}
    </>
  );
}
