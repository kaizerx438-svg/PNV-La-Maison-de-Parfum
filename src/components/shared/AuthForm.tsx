import Link from "next/link";

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: {
    text: string;
    linkText: string;
    linkHref: string;
  };
}

export default function AuthForm({
  title,
  subtitle,
  children,
  footer,
}: AuthFormProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#0D0D0D" }}
    >
      {/* Decorative vertical lines */}
      <div
        className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
      <div
        className="absolute right-8 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center mb-12">
          <span
            className="text-[10px] tracking-[0.6em] uppercase mb-1"
            style={{
              color: "#C9A96E",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            Maison
          </span>
          <span
            className="text-2xl tracking-[0.3em] uppercase font-light"
            style={{
              color: "#F5EFE6",
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            du Parfum
          </span>
          <div
            className="mt-3"
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </Link>

        {/* Card */}
        <div
          className="p-8"
          style={{
            background: "rgba(245,239,230,0.03)",
            border: "1px solid rgba(201,169,110,0.15)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-2xl font-light mb-2"
              style={{
                color: "#F5EFE6",
                fontFamily: "Georgia, Times New Roman, serif",
              }}
            >
              {title}
            </h1>
            <p
              className="text-xs tracking-[0.2em]"
              style={{
                color: "rgba(245,239,230,0.4)",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* Footer */}
        <p
          className="text-center mt-6 text-xs"
          style={{
            color: "rgba(245,239,230,0.35)",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          {footer.text}{" "}
          <Link
            href={footer.linkHref}
            className="transition-colors duration-300 hover:text-[#C9A96E]"
            style={{ color: "rgba(201,169,110,0.7)" }}
          >
            {footer.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}