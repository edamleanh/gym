const planData = [
    {
        id: 0,
        dayName: "Chủ Nhật",
        focus: "Active Recovery & Yoga",
        title: "Phục Hồi & Yoga",
        instructions: [
            "Đi bộ khoảng 12,000 bước.",
            "Tập luyện bài Everyday Yoga để phục hồi hệ thần kinh, cải thiện độ dẻo dai."
        ],
        images: ["assets/workouts/everyday-yoga.jpg"]
    },
    {
        id: 1,
        dayName: "Thứ Hai",
        focus: "Upper Body Strength & Core",
        title: "Lưng Xô, Kéo Xà & Cơ Lõi",
        instructions: [
            "Tập trung phát triển cơ xô (Lats) và tay trước bằng Xà đơn (Pull-up bar).",
            "Dùng dây kháng lực để trợ lực kéo xà nếu chưa quen, hoặc tập thêm bài Band Rows (Chèo thuyền bằng dây).",
            "💡 Tip: Nên tập thêm 3-4 hiệp Band Lateral Raise (Nâng vai ngang bằng dây) để vai rộng, tạo dáng V-taper.",
            "Hoàn thành phần Core với bài Core Exe."
        ],
        images: ["assets/workouts/pullup-level1.jpg", "assets/workouts/core-exe.jpg"]
    },
    {
        id: 2,
        dayName: "Thứ Ba",
        focus: "HIIT (High-Intensity Interval Training)",
        title: "Đốt Mỡ Tối Đa",
        instructions: [
            "Tập các bài không dụng cụ, cường độ cao.",
            "Dốc toàn lực (30s tập / 15s nghỉ) để tạo afterburn effect."
        ],
        images: ["assets/workouts/micro-hiit.jpg"]
    },
    {
        id: 3,
        dayName: "Thứ Tư",
        focus: "Lower Body Strength & Core",
        title: "Thân Dưới & Cơ Lõi",
        instructions: [
            "Xây dựng cơ chân, mông săn chắc.",
            "Đạp lên dây kháng lực để tạo lực cản cho bài Squat và Deadlift.",
            "💡 Tip: Tập vừa sức (RPE 7-8), không nên tập đến mức kiệt sức để cơ chân kịp phục hồi cho thứ 5 & 6.",
            "Kết thúc buổi tập với bài Core Exe."
        ],
        images: ["assets/workouts/high-volume-legs.jpg", "assets/workouts/core-exe.jpg"]
    },
    {
        id: 4,
        dayName: "Thứ Năm",
        focus: "Metabolic Conditioning (MetCon)",
        title: "Sức Mạnh & Trao Đổi Chất",
        instructions: [
            "Chuỗi bài tập liên hoàn giữ nhịp tim ở mức cao.",
            "Tập trung vào tốc độ và sức bền.",
            "💡 Tip: Nếu cơ chân đang rất đau mỏi từ Thứ 4, hãy thay thế các bài nhảy (Jumping) bằng Shadow Boxing (đấm gió) để giảm tải cho khớp gối."
        ],
        images: ["assets/workouts/cardio-trim.jpg", "assets/workouts/metcon-prime.jpg"]
    },
    {
        id: 5,
        dayName: "Thứ Sáu",
        focus: "Morning HIIT & Evening Full Body",
        title: "Tối Đa Phì Đại Cơ Bắp",
        instructions: [
            "Sáng: 15-20 phút Quick HIIT (hoặc Wake Up).",
            "Tối: Toàn thân. Thêm 3-4 hiệp kéo xà và dùng dây kháng lực cuốn tạ tay trước.",
            "💡 Tip: Chú trọng bơm máu (Pump) vào phần Tay (Biceps/Triceps) và Lưng bằng dây kháng lực."
        ],
        images: ["assets/workouts/wake-up.jpg", "assets/workouts/klingon-conditioning.jpg"]
    },
    {
        id: 6,
        dayName: "Thứ Bảy",
        focus: "Active Recovery & Mobility",
        title: "Phục Hồi Chủ Động",
        instructions: [
            "Đi bộ khoảng 12,000 bước hoặc đi dạo 1 tiếng.",
            "Thực hiện bài tập Mobility để giãn cơ động."
        ],
        images: ["assets/workouts/unbound.jpg"]
    }
];

const daySelector = document.getElementById('daySelector');
const currentDayBadge = document.getElementById('currentDayBadge');
const workoutTitle = document.getElementById('workoutTitle');
const workoutFocus = document.getElementById('workoutFocus');
const workoutInstructions = document.getElementById('workoutInstructions');
const workoutGallery = document.getElementById('workoutGallery');

let currentDay = new Date().getDay(); // 0-6 (Sun-Sat)
let today = currentDay;

function init() {
    renderNavigation();
    renderDay(currentDay);
}

function renderNavigation() {
    planData.forEach(day => {
        // Adjust the order starting from Monday (1) to Sunday (0) visually
        const btn = document.createElement('button');
        btn.className = `day-btn ${day.id === currentDay ? 'active' : ''}`;
        btn.textContent = day.dayName;
        btn.onclick = () => selectDay(day.id);
        daySelector.appendChild(btn);
    });
}

function selectDay(id) {
    currentDay = id;
    
    // Update active class
    document.querySelectorAll('.day-btn').forEach((btn, index) => {
        if (index === id) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    renderDay(id);
}

function renderDay(id) {
    const data = planData.find(d => d.id === id);
    if (!data) return;

    // Add animation reset
    const card = document.querySelector('.main-workout-card');
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = null;

    currentDayBadge.textContent = id === today ? `${data.dayName} (Hôm Nay)` : data.dayName;
    workoutTitle.textContent = data.title;
    workoutFocus.textContent = data.focus;

    // Render instructions
    let instHtml = `<h3>Hướng Dẫn Tập Luyện:</h3><ul>`;
    data.instructions.forEach(inst => {
        instHtml += `<li>${inst}</li>`;
    });
    instHtml += `</ul>`;
    workoutInstructions.innerHTML = instHtml;

    // Render Images
    workoutGallery.innerHTML = '';
    data.images.forEach(imgSrc => {
        const a = document.createElement('a');
        // Extract the filename without extension to use as a search keyword
        const keyword = imgSrc.split('/').pop().replace('.jpg', '').replace(/-/g, ' ');
        a.href = `https://darebee.com/workout.html?q=${keyword}`;
        a.target = "_blank";
        a.title = "Click để tìm kiếm bài này trên Darebee.com";

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Workout Plan Image";
        img.className = 'workout-image';
        
        // Error fallback
        img.onerror = function() {
            this.onerror = null;
            this.src = "https://via.placeholder.com/800x600/1e293b/94a3b8?text=Image+Not+Downloaded";
        };
        
        a.appendChild(img);
        workoutGallery.appendChild(a);
    });
}

// Initialize App
init();
