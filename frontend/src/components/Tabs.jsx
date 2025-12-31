export default function Tabs({ active, setActive, counts }) {
    return (
      <div className="tabs">
        {["All", "Original", "Updated"].map((tab) => (
          <button
            key={tab}
            className={active === tab ? "tab active" : "tab"}
            onClick={() => setActive(tab)}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>
    );
  }
  