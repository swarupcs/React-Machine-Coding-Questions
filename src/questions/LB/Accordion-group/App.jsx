import Accordion from "./components/Accordion";

export default function App() {
  return (
    <div>
      <h1>Accordion Group Component</h1>

      {/* ✅ Single Open Mode */}
      <h2 style={{ textAlign: "center" }}>Single Open</h2>

      <Accordion defaultValue="react">
        <Accordion.Item value="react">
          <Accordion.Trigger>What is React?</Accordion.Trigger>
          <Accordion.Content>
            React is a JavaScript library for building UI components.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="compound">
          <Accordion.Trigger>
            What are Compound Components?
          </Accordion.Trigger>
          <Accordion.Content>
            Compound components share implicit state and create flexible APIs.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="disabled" disabled>
          <Accordion.Trigger>This Item is Disabled</Accordion.Trigger>
          <Accordion.Content>
            This content cannot be opened.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      {/* ✅ Multiple Open Mode */}
      <h2 style={{ textAlign: "center" }}>Multiple Open</h2>

      <Accordion allowMultiple defaultValue={["privacy", "account"]}>
        <Accordion.Item value="privacy">
          <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
          <Accordion.Content>
            <p>✔ Profile visibility</p>
            <p>✔ Search engine indexing</p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="account">
          <Accordion.Trigger>Account Settings</Accordion.Trigger>
          <Accordion.Content>
            <button>Change Password</button>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="notifications">
          <Accordion.Trigger>Notifications</Accordion.Trigger>
          <Accordion.Content>
            <p>Email Alerts</p>
            <p>SMS Alerts</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
