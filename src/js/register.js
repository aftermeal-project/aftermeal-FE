document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const studentRadio = document.getElementById("studentRadio");
    const teacherRadio = document.getElementById("teacherRadio");
    // const emailInput = document.getElementById("email");
    const emailLabel = document.querySelector('label[for="email"]');
    const generationGroup = document.getElementById("generationGroup");

    function toggleFormFields() {
        if (studentRadio.checked) {
            generationGroup.style.display = "block"
            emailLabel.textContent = "학교 이메일";
        } else if (teacherRadio.checked) {
            generationGroup.style.display = "none";
            emailLabel.textContent = "이메일";
        }
    }

    studentRadio.addEventListener("change", toggleFormFields);
    teacherRadio.addEventListener("change", toggleFormFields);

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 이메일 검증
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(data.email)) {
            alert("올바른 이메일 형식을 입력하세요.");
            return;
        }

        // 학교 이메일 검증
        if (data.memberType === "STUDENT" && !data.email.endsWith(".gsm.hs.kr")) {
            alert("학생은 학교 이메일을 입력해야 합니다.");
            return;
        }

        // 등록 API 호출
        try {
            const response = await fetch('https://api.aftermeal.online/v1/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("사용자 등록이 완료되었습니다.");
                window.location.href = 'login.html'
            }
        } catch (e) {
            console.error("Error:", error);
            alert("사용자 등록 중 오류가 발생했습니다.");
        }
    });

    toggleFormFields(); // 초기화
});
