import AccordionItem from './Accordion/AccordionItem';
import { buildTree } from '../utils/buildTree';
import { tabs } from '../data/tabs';

const AccordionTree = () => {
  const treeData = buildTree(tabs);

  return (
    <div>
      {treeData.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AccordionTree;
