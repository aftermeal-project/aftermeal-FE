import "../styles/index.css";

document.addEventListener("DOMContentLoaded", () => loadActivities());

async function loadActivities() {
  return await fetch("https://api.aftermeal.online/v1/activities")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }
      return response.json();
    })
    .then((response) => {
      const activitiesContainer = document.getElementById("activities");
      activitiesContainer.innerHTML = ""; // Clear existing activities

      response.data.forEach((activity) => {
        const activityElement = document.createElement("div");
        activityElement.className = "activity-card";
        activityElement.innerHTML = `
                <h3>${activity.name}</h3>
                <p>👥 ${activity.participantsCount} / ${activity.maximumParticipants}</p>
                <button class="button" onclick="applyForActivity(${activity.id})">신청하기</button>
            `;
        activitiesContainer.appendChild(activityElement);
      });
    })
    .catch((error) => {
      console.error("Error loading activities:", error);
    });
}

// Simulating applying for an activity
function applyForActivity(activityId) {
  // TODO(로그인되어 있지 않다면 로그인 페이지로 리다이렉션)
  fetch(`https://api.aftermeal.online/v1/participation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "", // TODO(Bring Auth Token)
    },
    body: JSON.stringify({ activityId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Application for participation failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Application successful:", data);
      alert("Application successful!");
      // Update the UI accordingly
    });
}
