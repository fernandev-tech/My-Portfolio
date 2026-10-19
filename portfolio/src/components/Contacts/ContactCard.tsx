interface ContactCardProps {
  icon: React.ElementType;
  color: string;
  title: string;
  value: string;
  href?: string;
}

export function ContactCard({ icon: Icon, color, title, value, href }: ContactCardProps) {
  return (

    <div className="flex items-center gap-4 rounded-xl border border-[#263449] bg-[#121826] p-4">

      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1c2c43] text-[rgb(96,165,250)]"
      style={{color: color}}>
        <Icon />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-gray-100">{title}</h3>
        {href ?
          (
            <a href={href} target="_blanck"
              className="text-sm text-gray-400 transition-colors hover:text-[#60a5fa]">
              {value}</a>
          )
          :
          (
            <p className="text-sm text-gray-400">{value}</p>
          )
        }
      </div>
    </div>

  )
}