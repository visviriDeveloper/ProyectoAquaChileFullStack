function StatCard({ value, label }) {
  return (
    <div className="col-6 col-lg-3">
      <div className="card h-100">
        <div className="card-body">
          <h2 className="h3">{value}</h2>
          <p className="mb-0">{label}</p>
        </div>
      </div>
    </div>
  );
}
export default StatCard;
