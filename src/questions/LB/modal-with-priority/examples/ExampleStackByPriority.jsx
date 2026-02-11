import { useModal } from "../components/Modal";

export default function ExampleStackSamePriority() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() =>
        openModal({
          id: "modal-1",
          priority: 2,
          title: "Modal 1",
          content: (
            <button
              onClick={() =>
                openModal({
                  id: "modal-2",
                  priority: 2,
                  title: "Modal 2 (Same Priority)",
                  content: "Stacks above Modal 1",
                  primaryAction: {
                    label: "Ok",
                    onClick: () => alert("Ok"),
                  },
                })
              }
            >
              Open Modal 2
            </button>
          ),
        })
      }
    >
      Open Modal (Stack Same Priority)
    </button>
  );
}
