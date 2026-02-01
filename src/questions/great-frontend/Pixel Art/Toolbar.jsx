import { COLORS } from './colors';



export default function Toolbar({
  selectedColor,
  onColorChange,
  mode,
  onModeChange,
}) {
  function onColorClick(color) {
    onModeChange('draw');
    onColorChange(color);
  }

  return (
    <div className="toolbar">
      <div>
        <button
          onClick={() => onModeChange('draw')}
          className={[
            'toolbar__mode',
            mode === 'draw' && 'toolbar__mode--selected',
          ]
            .filter(Boolean)
            .join(' ')}>
          Draw
        </button>
        <button
          onClick={() => onModeChange('erase')}
          className={[
            'toolbar__mode',
            mode === 'erase' && 'toolbar__mode--selected',
          ]
            .filter(Boolean)
            .join(' ')}>
          Erase
        </button>
      </div>
      <div className="toolbar__color-picker">
        {Object.entries(COLORS).map(([color, hex]) => (
          <button
            key={color}
            aria-label={color}
            className={[
              'toolbar__color',
              color === selectedColor &&
                'toolbar__color--selected',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              borderColor: (() => {
                if (
                  color !== selectedColor &&
                  color === 'white'
                ) {
                  return '#ccc';
                }

                if (
                  color === selectedColor &&
                  color === 'black'
                ) {
                  return '#fff';
                }
              })(),
              backgroundColor: hex,
            }}
            onClick={() => onColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
}
