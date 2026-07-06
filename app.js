async function loadTeams() {

    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("points", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    const tbody = document.querySelector("#pointsTable tbody");
    tbody.innerHTML = "";

    data.forEach(team => {

        tbody.innerHTML += `
        <tr>
            <td>${team.name}</td>
            <td>${team.played}</td>
            <td>${team.win}</td>
            <td>${team.draw}</td>
            <td>${team.loss}</td>
            <td>${team.gf}</td>
            <td>${team.ga}</td>
            <td>${team.gd}</td>
            <td><b>${team.points}</b></td>
        </tr>
        `;

    });

}

loadTeams();

supabase
.channel("teams-live")
.on(
    "postgres_changes",
    {
        event: "*",
        schema: "public",
        table: "teams"
    },
    () => {
        loadTeams();
    }
)
.subscribe();
