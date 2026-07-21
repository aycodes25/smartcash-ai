interface PageHeaderProps {
  title: string;
  subtitle: string;
}

function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;