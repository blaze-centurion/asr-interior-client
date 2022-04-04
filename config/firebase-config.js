import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAjxxZ5nvstSWKcf3whnTAngZpZOjoD4L4",
	authDomain: "asr-interior.firebaseapp.com",
	projectId: "asr-interior",
	storageBucket: "asr-interior.appspot.com",
	messagingSenderId: "794359604617",
	appId: "1:794359604617:web:ac4d0fc5b0f827a5742d58",
	measurementId: "G-CN3GXHZBBB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
