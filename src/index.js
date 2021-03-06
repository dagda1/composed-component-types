import { create } from "microstates";
import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import withMicrostate from "./withMicrostate";

class Preferences {
  givenNameFirst = Boolean;

  get lastUpdated() {
    return new Date().toLocaleTimeString();
  }
}

export class User {
  firstName = String;
  lastName = String;
  preferences = Preferences;

  get fullName() {
    if (this.preferences.givenNameFirst) {
      return `${this.firstName} ${this.lastName}`;
    } else {
      return `${this.lastName} ${this.firstName}`;
    }
  }
}

class Session {
  user = User;
}

class MyApp {
  session = Session;
}

let initial = create(MyApp, {
  session: {
    user: {
      firstName: "Taras",
      lastName: "Mankovski",
      preferences: { givenNameFirst: true }
    }
  }
});

let App = withMicrostate(({ microstate: app }) => (
  <fieldset>
    <legend>Parent</legend>
    <h2>{app.session.user.state.fullName}</h2>
    <div>
      Preferences last updated: {app.session.user.preferences.state.lastUpdated}
    </div>
    <p>
      <label>
        Show given name first?{" "}
        <input
          type="checkbox"
          checked={app.session.user.preferences.givenNameFirst.state}
          onChange={() => app.session.user.preferences.givenNameFirst.toggle()}
        />
      </label>
    </p>
    <Hello user={app.session.user} />
  </fieldset>
), initial);

render(<App />, document.getElementById("root"));
