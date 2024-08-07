import "../styles/register.css";
import { registerApi } from "../libs/api/users.js";

const form = document.getElementById("registrationForm");
const studentRadio = document.getElementById("studentRadio");
const teacherRadio = document.getElementById("teacherRadio");
const emailLabel = document.querySelector('label[for="email"]');
const generationGroup = document.getElementById("generationGroup");
const generationNumberInput = document.getElementById("generationNumber");

studentRadio.addEventListener("change", toggleFormFields);
teacherRadio.addEventListener("change", toggleFormFields);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  register();
});

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

async function register() {
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
    data.generationNumber = Number(data.generationNumber);

    // 선생님일 경우 generationNumber 속성 제거
    if (data.type === "TEACHER") {
      delete data.generationNumber;
    }

    await registerApi(data);

    alert("사용자 등록이 완료되었습니다.");
    window.location.href = "login.html";
  } catch (error) {
    const statusCode = error?.response?.status;

    if (statusCode === 400 || statusCode === 404) {
      alert(error?.response?.data?.message);
    } else {
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
}
