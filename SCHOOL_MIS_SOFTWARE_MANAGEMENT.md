# SchoolMIS Desktop Software & `win-unpacked` End-Software Management Guide

## 1. Architecture Overview

The SchoolMIS ecosystem consists of three interconnected parts:

```
┌─────────────────────────────────┐       npx asar pack        ┌──────────────────────────────────┐
│       D:\files\app_source       │ ─────────────────────────> │      D:\files\win-unpacked       │
│  (Editable Source Code & UI)    │                            │  (Standalone Windows Desktop App)│
│  • src/index.html               │                            │  • SchoolMIS.exe                 │
│  • src/login.html               │                            │  • resources/app.asar            │
│  • main.js (Electron IPC)       │                            └──────────────────────────────────┘
└─────────────────────────────────┘                                             ▲
                 │                                                              │
                 ▼                                                              │
┌─────────────────────────────────┐                                             │
│       Admin Portal & Server     │ <────────── Periodic License Check ─────────┘
│  (digitalsimplesolution.online) │             • POST /api/activate
│  • /admin (School MIS Tab)      │             • POST /api/ping
│  • Issue & Manage Licenses      │             • GET  /api/updates/check (OTA)
│  • Hardware Machine PC Locks    │
└─────────────────────────────────┘
```

---

## 2. Can `D:\files\win-unpacked` Be Managed and Modified?

**YES, 100%!**

You can modify any feature, button, fee receipt design, or student admission logic directly.

### Where the Files Live:
| Component | File Path | What You Can Modify |
|---|---|---|
| **Main ERP Application UI** | `D:\files\app_source\src\index.html` | All screens: Students, Attendance Register, Class Timetable, Fee Receipts (INR), Grading, Reports, and Print layouts. |
| **Login & Activation UI** | `D:\files\app_source\src\login.html` | School branding, login box, license key input, eye password toggle, error messages. |
| **Electron Main Process** | `D:\files\app_source\main.js` | Desktop window size, printer integration, local SQLite/JSON storage, license check intervals, OTA updater. |
| **Excel & CSV Import Engine** | `D:\files\app_source\src\import.js` | 1-click student list import logic and column mappings. |
| **Compiled App Bundle** | `D:\files\win-unpacked\resources\app.asar` | The single binary archive that `SchoolMIS.exe` executes. |

---

## 3. How to Make Modifications to the End Software (Step-by-Step)

### Step 1: Edit the Code in `D:\files\app_source`
Make your desired changes in `D:\files\app_source\src\index.html` or `D:\files\app_source\main.js` using your code editor.

### Step 2: Compile & Pack into `win-unpacked` (Takes ~2 Seconds)
From this project workspace, run:
```bash
npm run pack:schoolmis
```
*(Under the hood, this executes `npx asar pack "D:\files\app_source" "D:\files\win-unpacked\resources\app.asar"`).*

### Step 3: Run and Verify Immediately
Launch the executable to test your changes live:
```powershell
& "D:\files\win-unpacked\SchoolMIS.exe"
```
The application will launch immediately with your new code! No full rebuild or Electron recompilation required.

---

## 4. How Remote Over-The-Air (OTA) Updates Work

When you want all existing client schools to receive your software changes automatically **without them needing to reinstall anything**:

1. In `D:\files\app_source\package.json`, bump the version (e.g. from `1.3.0` to `1.3.1`).
2. Run the automated deployment script:
   ```bash
   npm run deploy:schoolmis
   ```
   *(Or run: `powershell -ExecutionPolicy Bypass -File "D:\files\deploy-to-railway.ps1" -Version "1.3.1" -Changelog "Added custom fee receipt watermark"`)*.
3. This script will:
   - Compile `D:\files\app_source` into `app.asar`.
   - Calculate the SHA256 checksum and exact byte size.
   - Update `updates.json` and upload the release to the server.
   - Synchronize with the local `win-unpacked` distribution.
4. When any client school opens `SchoolMIS.exe` on their Windows PC:
   - The app checks `GET /api/updates/check?version=1.3.0`.
   - It detects version `1.3.1` is available.
   - It downloads `app.asar` silently in the background, verifies the SHA256 hash, hot-swaps `resources\app.asar`, and prompts the user to restart!

---

## 5. How to Issue and Manage Licenses in the Admin Portal

1. Open your **Admin Portal**: [digitalsimplesolution.online/admin](https://www.digitalsimplesolution.online/admin).
2. Go to the **School MIS & Licenses** tab.
3. Click **"Generate New License"**:
   - Enter **School Name** (e.g. *Rainbow English Medium School*).
   - Select **Plan** (Enterprise / Pro / Basic).
   - Choose validity (1 Month Trial, 1 Year, or Lifetime).
   - Enter contact phone number.
4. Click **"Issue License Key"**.
5. Click **"Send on WhatsApp"** to send the key and activation instructions directly to the school principal.

### Managing Bound Computers & PC Lock Resets:
- When a school activates their license, the software locks to that PC's motherboard / hardware ID (`machineId`).
- If the school buys a new computer or formats Windows, click the **`🔄 Reset PC`** button next to their license in your Admin Portal. This releases the lock so they can reactivate instantly.

---

## 6. How to Package and Distribute to a New School

To give the software to a new school:
1. Compress `D:\files\win-unpacked` into a zip file (or use `SchoolMIS-Windows.zip`).
2. Provide the download link or send via USB drive / Google Drive.
3. The school extracts the zip file and runs `SchoolMIS.exe`.
4. They enter their assigned license key (`SMIS-XXXX-XXXX-XXXX-XXXX`) on the **Activate** tab.
5. They log in with default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
   *(They can change their password anytime inside the app under Settings).*

---

## 7. School Credentials & Gmail OTP Password Recovery System

To ensure seamless school onboarding and zero locked-out schools, SchoolMIS supports both **Direct Admin Password Dispatch** and **Self-Service Gmail OTP Recovery**:

### 1. Centralized Admin Credential Management:
- In [digitalsimplesolution.online/admin](https://www.digitalsimplesolution.online/admin) under **School MIS & Licenses**:
  - Each school license displays its **Username** and **Password** (with 1-click eye toggle to reveal and 1-click copy).
  - Each school displays its **Registered Recovery Gmail** (e.g. `mhkr038@gmail.com`).
  - **1-Click WhatsApp Share**: Sends formatted credentials (Username, Password, Recovery Email, and License Key) directly to the principal's WhatsApp.
  - **1-Click Send via Gmail**: Dispatches official login credentials directly to the school's registered Gmail with a single click.
  - **Edit Credentials**: Admin can modify or reset the school's username, password, or recovery Gmail at any time.

### 2. Self-Service Desktop Password Recovery via Gmail OTP:
- When a school opens `SchoolMIS.exe` and clicks **"Forgot password? Reset via Gmail"**:
  1. **Gmail Validation**: The school enters their recovery Gmail.
  2. **Server Check**: The desktop software calls `POST /api/license/forgot-password/send-code`. The server verifies that the entered Gmail matches the registered recovery email for that school license on the server.
  3. **6-Digit OTP Dispatched**: If verified, a 6-digit verification code is generated (valid for 10 minutes) and dispatched to their Gmail via nodemailer.
  4. **Code Verification & Password Reset**: The school enters the 6-digit code and chooses a new password. The software calls `POST /api/license/forgot-password/verify-code`.
  5. **Auto-Login**: Once verified, the password is encrypted and updated on the server and synced in local `school_data.json`, and the user is automatically logged in!

### 3. Direct Support Alternative:
- If a school cannot access their Gmail or has network difficulty, they can contact DSS Admin directly (+91 85006 99708).
- The Admin can view their password in the Admin Portal, reset it manually, or dispatch it via WhatsApp or Gmail.
