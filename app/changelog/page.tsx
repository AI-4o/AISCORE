import { config } from "appConfig";

export default function ChangeLog() {
  return (
    <div className="bg-white w-full text-black p-4 rounded-lg">
      <h1 className="text-2xl my-5 font-bold">Change Log</h1>
      <ul>
        {config.changeLog.reverse().map((change) => (
          <li key={change.version}>
            V{change.version} - {change.description}.
          </li>
        ))}
      </ul>
    </div>
  );
}
