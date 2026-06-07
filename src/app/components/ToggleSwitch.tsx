import * as Switch from '@radix-ui/react-switch';

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  color?: 'blue' | 'green';
  disabled?: boolean;
  id?: string;
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
} as const;

export function ToggleSwitch({
  checked,
  onCheckedChange,
  color = 'blue',
  disabled = false,
  id,
}: ToggleSwitchProps) {
  return (
    <Switch.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={`relative w-11 h-6 shrink-0 rounded-full transition-colors ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${checked ? colorClasses[color] : 'bg-gray-300'}`}
    >
      <Switch.Thumb
        className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </Switch.Root>
  );
}
