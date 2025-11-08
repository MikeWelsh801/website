// add imports for projects here
import avyviz from "./assets/avyviz.json";
import finalssim from "./assets/finalssim.json";
import turkishgame from "./assets/turkishgame.json";
import log_viewer from "./assets/log_viewer.json";

/**
 * @param name - The name of the project
 * @param platform - the platform it runs on
 * @param description - describe the project
 * @param link - optional link to the project
 * @returns the html for the project
 */
function project(path: any): string {
  let nameString = `<a>${path["name"]}</a>`;
  if (path["link"] !== undefined) {
    nameString = `<a href="${path["link"]}">${path["name"]}</a>`;
  }

  return `
      <br>
      ${nameString}
      <a>|</a>
      <a>${path["platform"]}</a>
      <p>
        ${path["description"]}
      </p>`;
}

// add projects to website here
[
  log_viewer,
  avyviz,
  finalssim,
  turkishgame
]
  .forEach((file) => {
    document.getElementById("proj")!.innerHTML += project(file);
  });

