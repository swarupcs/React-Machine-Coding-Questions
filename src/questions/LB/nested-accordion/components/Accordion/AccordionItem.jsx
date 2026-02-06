import { useState } from 'react';

const AccordionItem = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children.length > 0;

  return (
    <div>
      <div
        className='accordion-item'
        style={{ paddingLeft: level * 16 }}
        onClick={() => hasChildren && setOpen((prev) => !prev)}
      >
        <span className='icon'>{hasChildren ? (open ? '▼' : '▶') : '—'}</span>
        <span>{item.name}</span>
      </div>

      {open &&
        hasChildren &&
        item.children.map((child) => (
          <AccordionItem key={child.id} item={child} level={level + 1} />
        ))}
    </div>
  );
};

export default AccordionItem;
