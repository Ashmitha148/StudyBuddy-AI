function FeatureCard(props) {
  return (
    <div className="card">
      <h1>{props.icon}</h1>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
export default FeatureCard;