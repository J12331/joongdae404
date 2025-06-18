// Google Apps Script 웹앱 URL (새로 배포한 URL로 교체하세요)
const GAS_URL = "https://script.google.com/macros/s/AKfycbySI0FBLkyjJ5womXR2udT5B4LFsI08DMIru0Pl-OhdjBPXU1V8RRauHL7ajrejKvZXNA/exec";

function lookup() {
  const name  = encodeURIComponent(document.getElementById("name").value.trim());
  const birth = encodeURIComponent(document.getElementById("birth").value.trim());
  const phone = encodeURIComponent(document.getElementById("phone").value.trim());
  const resultDiv = document.getElementById("result");

  if (!name || !birth || !phone) {
    resultDiv.innerHTML = "<p>모든 필드를 입력해주세요.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>조회 중입니다...</p>";

  // JSONP 콜백 이름
  const cbName = "handleGrades";

  // 전역에 콜백 함수 등록
  window[cbName] = function(data) {
    delete window[cbName];
    document.body.removeChild(script);

    if (!data.length) {
      resultDiv.innerHTML = "<p>해당 학생 정보를 찾을 수 없습니다.</p>";
    } else {
      let html = "<table><tr><th>이름</th><th>과목</th><th>단원명</th><th>점수</th></tr>";
      data.forEach(item => {
        html += `<tr>
                   <td>${item.이름}</td>
                   <td>${item.과목}</td>
                   <td>${item.단원명}</td>
                   <td>${item.점수}</td>
                 </tr>`;
      });
      html += "</table>";
      resultDiv.innerHTML = html;
    }
  };

  // JSONP 호출용 <script> 태그 생성
  const script = document.createElement("script");
  script.src = `${GAS_URL}`
             + `?name=${name}`
             + `&birth=${birth}`
             + `&phone=${phone}`
             + `&callback=${cbName}`;
  document.body.appendChild(script);
}

