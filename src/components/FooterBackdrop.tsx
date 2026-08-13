export default function FooterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="bg-gradient-footer fixed bottom-0 h-[48rem] w-full desktop:h-[90rem]"
    >
      <svg
        viewBox="0 0 47 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[1rem] left-1/2 w-[96%] -translate-x-1/2 fill-white"
      >
        <text
          x="23.5"
          y="11.8"
          textAnchor="middle"
          className="font-heading"
          fontSize="14"
          fill="white"
        >
          Selmou
        </text>
      </svg>
    </div>
  );
}
