interface SvgIconProps {
  name: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}

export const SvgIcon = ({
  name,
  width = 24,
  height = 24,
  ...props
}: SvgIconProps) => {
  return (
    <svg width={width} height={height} {...props}>
      <use xlinkHref={`/icons.svg#${name}`} />
    </svg>
  );
};