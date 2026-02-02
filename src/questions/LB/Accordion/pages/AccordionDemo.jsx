import { AccordionGroup } from "../components/Accordion";

const data = [
  {
    label: "What is React?",
    content: "React is a JavaScript library for building UIs."
  },
  {
    label: "What is an Accordion?",
    content: "Accordion is a collapsible UI component."
  },
  {
    label: "Why controlled components?",
    content: "They give predictable data flow."
  }
];

const AccordionDemo = () => {
  return <AccordionGroup items={data} />;
};

export default AccordionDemo;
