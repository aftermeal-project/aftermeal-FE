import "../styles/register.css";
import { BASE_URL } from "../constants/index.js";

const form = document.getElementById("registrationForm");
const studentRadio = document.getElementById("studentRadio");
const teacherRadio = document.getElementById("teacherRadio");
const emailLabel = document.querySelector('label[for="email"]');
const generationGroup = document.getElementById("generationGroup");
const generationNumberInput = document.getElementById("generationNumber");

async function register() {
  console.log("execute");
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
  if (data.type === "STUDENT" && !data.email.endsWith("@gsm.hs.kr")) {
    alert("학생은 학교 이메일을 입력해야 합니다.");
    return;
  }

  // 비밀번호 안전도 검증
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  if (!data.password.match(passwordPattern)) {
    alert(
      "비밀번호는 영문 대문자 및 소문자, 숫자, 특수문자를 포함하여 8자 이상, 20자 이하로 입력하세요."
    );
    return;
  }

  // 사용자 등록 API 호출
  try {
    // 기수를 number 타입으로 변환
    data.generationNumber = Number(data.generationNumber);

    // 선생님일 경우 generationNumber 속성 제거
    if (data.type === "TEACHER") {
      delete data.generationNumber;
    }

    const response = await fetch(BASE_URL + "/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("사용자 등록이 완료되었습니다.");
      window.location.href = "login.html";
    } else {
      const error = await response.json();

      if (error.statusCode === 400 || error.statusCode === 404) {
        alert(error.message);
      } else {
        alert("사용자 등록 중 오류가 발생했습니다.");
      }
    }
  } catch {
    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

function toggleFormFields() {
  if (studentRadio.checked) {
    generationGroup.style.display = "block";
    emailLabel.textContent = "학교 이메일";
    generationNumberInput.required = true;
  } else if (teacherRadio.checked) {
    generationGroup.style.display = "none";
    emailLabel.textContent = "이메일";
    generationNumberInput.required = false;
  }
}

studentRadio.addEventListener("change", toggleFormFields);
teacherRadio.addEventListener("change", toggleFormFields);

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  await register().then(toggleFormFields());
});
