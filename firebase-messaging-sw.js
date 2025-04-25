  importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');
  
  const FirebaseConfig = {
    apiKey: "AIzaSyCkctqefpKYUZaM25jL0fECk7Or9Xj6zBw",
    authDomain: "test-c1746.firebaseapp.com",
    projectId: "test-c1746",
    storageBucket: "test-c1746.firebasestorage.app",
    messagingSenderId: "403683174412",
    appId: "1:403683174412:web:950ba2e9b05acd296a2629",
    measurementId: "G-12V2M0TP73"
  };
  const App = firebase.initializeApp(FirebaseConfig);
  const Msg = firebase.messaging(App);
  
  self.addEventListener("notificationclick", (event)=>{
    const UrlToOpen = event.notification?.data || "/";
    event.waitUntil(clients.openWindow(UrlToOpen));
    
    event.notification.close();
  });
  
  Msg.onBackgroundMessage((Data)=>{
    const CustomNotification = Data.data;
    if(CustomNotification){
      self.registration.showNotification(CustomNotification.title, {
        data: CustomNotification?.data || null,
        body: CustomNotification?.body || null,
        image: CustomNotification?.image || null,
        icon: CustomNotification?.icon || null,
        badge: CustomNotification?.badge || null,
        silent: CustomNotification.silent === 'true' ? true : false,
        renotify: CustomNotification.renotify === 'true' ? true : false,
        tag: CustomNotification?.tag || Date.now(),
      });
    }
  });