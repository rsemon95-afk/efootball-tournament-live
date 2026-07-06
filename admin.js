async function loadTeams() {
    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("name");

    if (error) {
        console.error(error);
        return;
    }

    const list = document.getElementById("teamList");
    list.innerHTML = "";

    data.forEach(team => {
        list.innerHTML += `
            <div class="match-card">
                <span>${team.name}</span>
                <button onclick="deleteTeam(${team.id})">Delete</button>
            </div>
        `;
    });
}

async function addTeam() {
    const input = document.getElementById("teamName");
    const name = input.value.trim();

    if (!name) {
        alert("Team name লিখুন");
        return;
    }

    const { error } = await supabase
        .from("teams")
        .insert([{ name: name }]);

    if (error) {
        alert(error.message);
        return;
    }

    input.value = "";
    loadTeams();
}

async function deleteTeam(id) {
    if (!confirm("এই টিমটি Delete করতে চান?")) return;

    const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    loadTeams();
}

loadTeams();
