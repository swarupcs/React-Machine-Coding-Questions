import { useModal } from "../components/Modal";

export default function ExampleHighPriority() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() =>
        openModal({
          id: "low-modal",
          priority: 1,
          title: "Low Priority Modal",
          content: (
            <button
              onClick={() =>
                openModal({
                  id: "high-modal",
                  priority: 3,
                  title: "High Priority Modal",
                  content: "This closes all lower modals!",
                  primaryAction: {
                    label: "Save",
                    onClick: () => alert("Saved"),
                  },
                  secondaryAction: {
                    label: "Cancel",
                    onClick: () => alert("Cancelled"),
                  },
                })
              }
            >
              Open High Priority Modal
            </button>
          ),
          primaryAction: {
            label: "Continue",
            onClick: () => alert("Continue"),
          },
        })
      }
    >
      Open Modal (Priority Close)
    </button>
  );
}
