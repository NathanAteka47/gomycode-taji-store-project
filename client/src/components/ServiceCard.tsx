interface Props {
  title: string;
  description: string;
  iconUrl?: string;
}

const ServiceCard = ({ title, description, iconUrl }: Props) => (
  <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
    {iconUrl && <img src={iconUrl} alt={title} className="w-16 h-16 mx-auto mb-4" />}
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServiceCard;
