import { Fragment } from "react";

export default function Roles({ roles, className = "" }) {
  return (
    <p className={`roles ${className}`}>
      {roles.map((r, i) => (
        <Fragment key={r}>
          {i > 0 && <span className="dot" aria-hidden="true" />}
          <span>{r}</span>
        </Fragment>
      ))}
    </p>
  );
}
