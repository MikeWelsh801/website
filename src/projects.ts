/**
 * @param name - The name of the project
 * @param platform - the platform it runs on
 * @param description - describe the project
 * @param link - optional link to the project
 * @returns the html for the project
 */
async function project(path: string): Promise<string> {
  const json = await import(/* @vite-ignore */ path);

  let nameString = `<a>${json["name"]}</a>`
  if (json["link"] !== undefined) {
    nameString = `<a href="${json["link"]}">${json["name"]}</a>`;
  }
  let image = "";
  if (json["image"] !== undefined) {
    image = `<img src="./src/assets/${json["image"]}"/>`
  }


  return `
      <br>
      ${nameString}
      <a>|</a>
      <a>${json["platform"]}</a>
      ${image}
      <p>
        ${json["description"]}
      </p>`;
}


// add project jsons to dynamically load
[
  "avyviz.json",
  "finalssim.json",
  "turkishgame.json"
]
  .forEach((file) => {
    project(`./projects/${file}`).then((projects) => {
      document.getElementById("proj")!.innerHTML += projects;
    });
  });
