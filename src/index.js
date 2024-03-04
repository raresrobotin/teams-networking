import "./style.css";

function createTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

function getTeamAsHTML(team) {
  return `<tr>
    <td>${team.promotion}</td>
    <td>${team.members}</td>
    <td>${team.name}</td>
    <td>${team.url}</td>
    <td>x</td>
  </tr>`;
}

function renderTeams(teams) {
  //console.warn("render", teams);
  const teamsHTML = teams.map(getTeamAsHTML);
  //console.info(teamsHTML);

  document.querySelector("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
      return teams;
    });
}

function onSubmit(e) {
  e.preventDefault();
  console.warn("pls save all values");
  let team = {
    promotion: document.querySelector("input[name=promotion]").value,
    members: document.querySelector("input[name=members]").value,
    name: document.querySelector("input[name=name]").value,
    url: document.querySelector("input[name=url]").value
  };
  createTeamRequest(team);
  window.location.reload();
}

function initEvents() {
  document.querySelector("#teamsForm").addEventListener("submit", onSubmit);
}

initEvents();
loadTeams();
