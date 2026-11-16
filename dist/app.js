(() => {
  // shims/react.js
  var R = window.React;
  var react_default = R;
  var { useState, useEffect, useMemo, useReducer, useRef, useCallback, Fragment, createElement } = R;

  // shims/react-dom-client.js
  var createRoot = (el) => window.ReactDOM.createRoot(el);

  // src/data/i18n.js
  var LANGS = [
    { id: "en", label: "English" },
    { id: "vi", label: "Ti\u1EBFng Vi\u1EC7t" },
    { id: "ko", label: "\uD55C\uAD6D\uC5B4" }
  ];
  var s = (en, vi, ko) => ({ en, vi, ko });
  var UI = {
    tagline: s("Learn. Build. Belong.", "H\u1ECDc. X\xE2y. G\u1EAFn k\u1EBFt.", "\uBC30\uC6B0\uACE0, \uC9D3\uACE0, \uD568\uAED8\uD574\uC694."),
    start: s("Start Building", "B\u1EAFt \u0111\u1EA7u x\xE2y", "\uB3C4\uC2DC \uB9CC\uB4E4\uAE30 \uC2DC\uC791"),
    continue: s("Continue my city", "Ti\u1EBFp t\u1EE5c th\xE0nh ph\u1ED1 c\u1EE7a m\xECnh", "\uB0B4 \uB3C4\uC2DC \uC774\uC5B4\uC11C \uD558\uAE30"),
    chooseLang: s("Language", "Ng\xF4n ng\u1EEF", "\uC5B8\uC5B4"),
    chooseAge: s("Who is playing?", "Ai \u0111ang ch\u01A1i?", "\uB204\uAC00 \uD50C\uB808\uC774\uD558\uB098\uC694?"),
    little: s("Little Makers", "Little Makers", "Little Makers"),
    littleAge: s("Ages 4\u20136", "4\u20136 tu\u1ED5i", "4\u20136\uC138"),
    littleDesc: s("Pictures, sounds and short games", "H\xECnh \u1EA3nh, \xE2m thanh v\xE0 tr\xF2 ch\u01A1i ng\u1EAFn", "\uADF8\uB9BC, \uC18C\uB9AC, \uC9E7\uC740 \uB180\uC774"),
    junior: s("Junior Makers", "Junior Makers", "Junior Makers"),
    juniorAge: s("Ages 7\u201310", "7\u201310 tu\u1ED5i", "7\u201310\uC138"),
    juniorDesc: s("Sentences, reading and bigger missions", "\u0110\u1EB7t c\xE2u, b\xE0i \u0111\u1ECDc v\xE0 nhi\u1EC7m v\u1EE5 l\u1EDBn h\u01A1n", "\uBB38\uC7A5, \uC77D\uAE30, \uB354 \uD070 \uBBF8\uC158"),
    privacy: s("No names. No accounts. Progress stays in this browser.", "Kh\xF4ng c\u1EA7n t\xEAn. Kh\xF4ng c\u1EA7n t\xE0i kho\u1EA3n. Ti\u1EBFn \u0111\u1ED9 ch\u1EC9 l\u01B0u tr\xEAn tr\xECnh duy\u1EC7t n\xE0y.", "\uC774\uB984\uB3C4 \uACC4\uC815\uB3C4 \uD544\uC694 \uC5C6\uC5B4\uC694. \uC9C4\uD589 \uC0C1\uD669\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB3FC\uC694."),
    missions: s("Missions", "Nhi\u1EC7m v\u1EE5", "\uBBF8\uC158"),
    build: s("Build", "X\xE2y d\u1EF1ng", "\uC9D3\uAE30"),
    myCity: s("My City", "Th\xE0nh ph\u1ED1 c\u1EE7a m\xECnh", "\uB0B4 \uB3C4\uC2DC"),
    grownups: s("Grown-ups", "Ph\u1EE5 huynh", "\uBCF4\uD638\uC790"),
    city: s("City", "Th\xE0nh ph\u1ED1", "\uB3C4\uC2DC"),
    back: s("Back", "Quay l\u1EA1i", "\uB4A4\uB85C"),
    close: s("Close", "\u0110\xF3ng", "\uB2EB\uAE30"),
    cancel: s("Cancel", "H\u1EE7y", "\uCDE8\uC18C"),
    done: s("Done", "Xong", "\uC644\uB8CC"),
    letsGo: s("Let's go", "B\u1EAFt \u0111\u1EA7u th\xF4i", "\uC2DC\uC791\uD558\uAE30"),
    emptyPlot: s("Empty spot", "\xD4 \u0111\u1EA5t tr\u1ED1ng", "\uBE48 \uC790\uB9AC"),
    cityMap: s("City map", "B\u1EA3n \u0111\u1ED3 th\xE0nh ph\u1ED1", "\uB3C4\uC2DC \uC9C0\uB3C4"),
    lv0: s("Empty Land", "\u0110\u1EA5t tr\u1ED1ng", "\uBE48 \uB545"),
    lv1: s("Little Village", "Ng\xF4i l\xE0ng nh\u1ECF", "\uC791\uC740 \uB9C8\uC744"),
    lv2: s("Friendly Town", "Th\u1ECB tr\u1EA5n th\xE2n thi\u1EC7n", "\uB2E4\uC815\uD55C \uB3D9\uB124"),
    lv3: s("Busy City", "Th\xE0nh ph\u1ED1 nh\u1ED9n nh\u1ECBp", "\uD65C\uAE30\uCC2C \uB3C4\uC2DC"),
    lv4: s("Welcoming City", "Th\xE0nh ph\u1ED1 ch\xE0o \u0111\xF3n m\u1ECDi ng\u01B0\u1EDDi", "\uBAA8\uB450\uB97C \uD658\uC601\uD558\uB294 \uB3C4\uC2DC"),
    buildingsCount: s("{n} of {total} buildings", "{n}/{total} c\xF4ng tr\xECnh", "\uAC74\uBB3C {n}/{total}"),
    g_first: s("Hi, I am Pip, your building guide! This land is empty. Let's do a mission to get your first building.", "Ch\xE0o b\u1EA1n, m\xECnh l\xE0 Pip, ng\u01B0\u1EDDi h\u01B0\u1EDBng d\u1EABn x\xE2y d\u1EF1ng! M\u1EA3nh \u0111\u1EA5t n\xE0y c\xF2n tr\u1ED1ng. C\xF9ng l\xE0m nhi\u1EC7m v\u1EE5 \u0111\u1EC3 nh\u1EADn c\xF4ng tr\xECnh \u0111\u1EA7u ti\xEAn nh\xE9.", "\uC548\uB155, \uB098\uB294 \uAC74\uCD95 \uC548\uB0B4\uC790 \uD54D\uC774\uC57C! \uC774 \uB545\uC740 \uC544\uC9C1 \uBE44\uC5B4 \uC788\uC5B4. \uBBF8\uC158\uC744 \uD558\uACE0 \uCCAB \uAC74\uBB3C\uC744 \uBC1B\uC544 \uBCF4\uC790."),
    g_permit: s("You have a building permit! Tap Build and choose a spot.", "B\u1EA1n c\xF3 gi\u1EA5y ph\xE9p x\xE2y d\u1EF1ng r\u1ED3i! Ch\u1EA1m X\xE2y d\u1EF1ng v\xE0 ch\u1ECDn m\u1ED9t \xF4 \u0111\u1EA5t.", "\uAC74\uCD95 \uD5C8\uAC00\uC99D\uC774 \uC788\uC5B4! \uC9D3\uAE30\uB97C \uB204\uB974\uACE0 \uC790\uB9AC\uB97C \uACE8\uB77C \uBD10."),
    g_more: s("Missions are open. What will our city learn next?", "C\xF3 nhi\u1EC7m v\u1EE5 \u0111ang m\u1EDF. Th\xE0nh ph\u1ED1 m\xECnh s\u1EBD h\u1ECDc g\xEC ti\u1EBFp theo nh\u1EC9?", "\uBBF8\uC158\uC774 \uC5F4\uB824 \uC788\uC5B4. \uC6B0\uB9AC \uB3C4\uC2DC\uB294 \uB2E4\uC74C\uC5D0 \uBB34\uC5C7\uC744 \uBC30\uC6B8\uAE4C?"),
    g_done: s("Our city is complete! Tap a building to practice any time.", "Th\xE0nh ph\u1ED1 \u0111\xE3 ho\xE0n th\xE0nh! Ch\u1EA1m v\xE0o c\xF4ng tr\xECnh \u0111\u1EC3 luy\u1EC7n t\u1EADp b\u1EA5t c\u1EE9 l\xFAc n\xE0o.", "\uB3C4\uC2DC\uAC00 \uC644\uC131\uB410\uC5B4! \uAC74\uBB3C\uC744 \uB20C\uB7EC \uC5B8\uC81C\uB4E0 \uC5F0\uC2B5\uD574 \uBD10."),
    g_choose: s("Choose a building, then tap a glowing spot.", "Ch\u1ECDn m\u1ED9t c\xF4ng tr\xECnh, r\u1ED3i ch\u1EA1m v\xE0o \xF4 \u0111\u1EA5t \u0111ang s\xE1ng.", "\uAC74\uBB3C\uC744 \uACE0\uB978 \uB2E4\uC74C \uBE5B\uB098\uB294 \uC790\uB9AC\uB97C \uB20C\uB7EC \uBD10."),
    g_noPermit: s("Finish a mission to get a building permit.", "Ho\xE0n th\xE0nh m\u1ED9t nhi\u1EC7m v\u1EE5 \u0111\u1EC3 nh\u1EADn gi\u1EA5y ph\xE9p x\xE2y d\u1EF1ng.", "\uBBF8\uC158\uC744 \uB05D\uB0B4\uBA74 \uAC74\uCD95 \uD5C8\uAC00\uC99D\uC744 \uBC1B\uC544."),
    g_fit: s("A perfect spot! {b} fits {c}.", "V\u1ECB tr\xED tuy\u1EC7t v\u1EDDi! {b} r\u1EA5t h\u1EE3p v\u1EDBi {c}.", "\uB531 \uB9DE\uB294 \uC790\uB9AC\uC57C! {b}, {c}\uC5D0 \uC798 \uC5B4\uC6B8\uB824."),
    g_own: s("Nice choice! You picked your own spot for {b}.", "L\u1EF1a ch\u1ECDn hay \u0111\u1EA5y! B\u1EA1n \u0111\xE3 t\u1EF1 ch\u1ECDn ch\u1ED7 cho {b}.", "\uC88B\uC740 \uC120\uD0DD\uC774\uC57C! {b} \uC790\uB9AC\uB97C \uC2A4\uC2A4\uB85C \uACE8\uB790\uAD6C\uB098."),
    g_move: s("Tap an empty spot to move {b}.", "Ch\u1EA1m v\xE0o m\u1ED9t \xF4 tr\u1ED1ng \u0111\u1EC3 chuy\u1EC3n {b}.", "\uBE48 \uC790\uB9AC\uB97C \uB20C\uB7EC {b} \uAC74\uBB3C\uC744 \uC62E\uACA8 \uBD10."),
    g_moved: s("{b} has a new spot!", "{b} \u0111\xE3 c\xF3 ch\u1ED7 m\u1EDBi!", "{b}, \uC0C8 \uC790\uB9AC\uB85C \uC62E\uACBC\uC5B4!"),
    g_newMissions: s("New missions opened!", "Nhi\u1EC7m v\u1EE5 m\u1EDBi \u0111\xE3 m\u1EDF!", "\uC0C8 \uBBF8\uC158\uC774 \uC5F4\uB838\uC5B4!"),
    g_taken: s("This spot is taken. Tap a glowing one.", "\xD4 n\xE0y \u0111\xE3 c\xF3 c\xF4ng tr\xECnh. H\xE3y ch\u1EA1m v\xE0o \xF4 \u0111ang s\xE1ng.", "\uC774 \uC790\uB9AC\uB294 \uC774\uBBF8 \uCC3C\uC5B4. \uBE5B\uB098\uB294 \uC790\uB9AC\uB97C \uB20C\uB7EC \uBD10."),
    missionCenter: s("Mission Center", "Trung t\xE2m nhi\u1EC7m v\u1EE5", "\uBBF8\uC158 \uC13C\uD130"),
    goal: s("Learning goal", "M\u1EE5c ti\xEAu h\u1ECDc", "\uD559\uC2B5 \uBAA9\uD45C"),
    st_new: s("New", "M\u1EDBi", "\uC0C8 \uBBF8\uC158"),
    st_done: s("Done", "\u0110\xE3 xong", "\uC644\uB8CC"),
    st_locked: s("Build {n} buildings to open", "X\xE2y {n} c\xF4ng tr\xECnh \u0111\u1EC3 m\u1EDF", "\uAC74\uBB3C {n}\uAC1C\uB97C \uC9C0\uC73C\uBA74 \uC5F4\uB824\uC694"),
    play: s("Play", "Ch\u01A1i", "\uC2DC\uC791"),
    playAgain: s("Play again", "Ch\u01A1i l\u1EA1i", "\uB2E4\uC2DC \uD558\uAE30"),
    missionsProgress: s("{n} of {total} missions done", "\u0110\xE3 xong {n}/{total} nhi\u1EC7m v\u1EE5", "\uBBF8\uC158 {n}/{total} \uC644\uB8CC"),
    p_english: s("English", "Ti\u1EBFng Anh", "\uC601\uC5B4"),
    p_culture: s("Culture", "V\u0103n h\xF3a", "\uBB38\uD654"),
    p_life: s("Life skills", "K\u1EF9 n\u0103ng s\u1ED1ng", "\uC0DD\uD65C \uAE30\uC220"),
    p_sel: s("Feelings & friends", "C\u1EA3m x\xFAc & b\u1EA1n b\xE8", "\uAC10\uC815\uACFC \uCE5C\uAD6C"),
    newWords: s("New words", "T\u1EEB m\u1EDBi", "\uC0C8 \uB2E8\uC5B4"),
    weSay: s("We will say", "Ch\xFAng ta s\u1EBD n\xF3i", "\uC774\uB807\uAC8C \uB9D0\uD574\uC694"),
    startMission: s("Start mission", "B\u1EAFt \u0111\u1EA7u nhi\u1EC7m v\u1EE5", "\uBBF8\uC158 \uC2DC\uC791"),
    stepOf: s("Step {n} of {total}", "B\u01B0\u1EDBc {n}/{total}", "{total}\uB2E8\uACC4 \uC911 {n}\uB2E8\uACC4"),
    i_pick: s("Tap the right answer.", "Ch\u1EA1m v\xE0o c\xE2u tr\u1EA3 l\u1EDDi \u0111\xFAng.", "\uC54C\uB9DE\uC740 \uB2F5\uC744 \uB20C\uB7EC\uC694."),
    i_order: s("Tap the pieces in the right order.", "Ch\u1EA1m c\xE1c m\u1EA3nh theo \u0111\xFAng th\u1EE9 t\u1EF1.", "\uC21C\uC11C\uC5D0 \uB9DE\uAC8C \uC870\uAC01\uC744 \uB20C\uB7EC\uC694."),
    i_type: s("Type the missing word.", "G\xF5 t\u1EEB c\xF2n thi\u1EBFu.", "\uBE60\uC9C4 \uB2E8\uC5B4\uB97C \uC368\uC694."),
    i_choice: s("What would you do?", "B\u1EA1n s\u1EBD l\xE0m g\xEC?", "\uC5B4\uB5BB\uAC8C \uD560\uAE4C\uC694?"),
    i_sort: s("Drag each thing to the right bin. You can also tap it, then tap a bin.", "K\xE9o t\u1EEBng m\xF3n v\xE0o \u0111\xFAng th\xF9ng. B\u1EA1n c\u0169ng c\xF3 th\u1EC3 ch\u1EA1m v\xE0o m\xF3n \u0111\xF3 r\u1ED3i ch\u1EA1m v\xE0o th\xF9ng.", "\uBB3C\uAC74\uC744 \uC54C\uB9DE\uC740 \uD1B5\uC5D0 \uB04C\uC5B4\uB2E4 \uB193\uC544\uC694. \uBB3C\uAC74\uC744 \uB204\uB978 \uB2E4\uC74C \uD1B5\uC744 \uB20C\uB7EC\uB3C4 \uB3FC\uC694."),
    i_say: s("Say it out loud!", "H\xE3y n\xF3i th\u1EADt to!", "\uD070 \uC18C\uB9AC\uB85C \uB9D0\uD574 \uBD10\uC694!"),
    i_learn: s("Look and listen.", "Nh\xECn v\xE0 nghe.", "\uBCF4\uACE0 \uB4E4\uC5B4\uC694."),
    listen: s("Listen", "Nghe", "\uB4E3\uAE30"),
    check: s("Check", "Ki\u1EC3m tra", "\uD655\uC778"),
    next: s("Next", "Ti\u1EBFp", "\uB2E4\uC74C"),
    finish: s("Finish", "Ho\xE0n th\xE0nh", "\uB05D\uB0B4\uAE30"),
    iSaidIt: s("I said it!", "M\xECnh n\xF3i r\u1ED3i!", "\uB9D0\uD588\uC5B4\uC694!"),
    noRecord: s("The game does not record your voice.", "Tr\xF2 ch\u01A1i kh\xF4ng ghi \xE2m gi\u1ECDng n\xF3i.", "\uC774 \uAC8C\uC784\uC740 \uBAA9\uC18C\uB9AC\uB97C \uB179\uC74C\uD558\uC9C0 \uC54A\uC544\uC694."),
    tryAgain: s("Good try! Look again.", "C\u1ED1 l\xEAn! B\u1EA1n xem l\u1EA1i nh\xE9.", "\uC88B\uC740 \uC2DC\uB3C4\uC608\uC694! \uB2E4\uC2DC \uD55C\uBC88 \uBCFC\uAE4C\uC694?"),
    hint: s("Hint: it starts with \u201C{x}\u201D.", "G\u1EE3i \xFD: t\u1EEB n\xE0y b\u1EAFt \u0111\u1EA7u b\u1EB1ng \u201C{x}\u201D.", "\uD78C\uD2B8: \u201C{x}\u201D(\uC73C)\uB85C \uC2DC\uC791\uD574\uC694."),
    yourAnswer: s("Your answer", "C\xE2u tr\u1EA3 l\u1EDDi c\u1EE7a b\u1EA1n", "\uB0B4 \uB2F5"),
    tryAnother: s("Try another idea", "Th\u1EED \xFD kh\xE1c", "\uB2E4\uB978 \uC0DD\uAC01 \uD574 \uBCF4\uAE30"),
    praise: s("Great job!", "Gi\u1ECFi l\u1EAFm!", "\uCC38 \uC798\uD588\uC5B4\uC694!"),
    leave: s("Leave mission", "R\u1EDDi nhi\u1EC7m v\u1EE5", "\uBBF8\uC158 \uB098\uAC00\uAE30"),
    missionDone: s("Mission complete!", "Ho\xE0n th\xE0nh nhi\u1EC7m v\u1EE5!", "\uBBF8\uC158 \uC644\uB8CC!"),
    practiced: s("Practice complete!", "Luy\u1EC7n t\u1EADp xong!", "\uC5F0\uC2B5 \uC644\uB8CC!"),
    cityLesson: s("City lesson", "B\xE0i h\u1ECDc c\u1EE7a th\xE0nh ph\u1ED1", "\uB3C4\uC2DC\uC758 \uAD50\uD6C8"),
    permit: s("Building permit", "Gi\u1EA5y ph\xE9p x\xE2y d\u1EF1ng", "\uAC74\uCD95 \uD5C8\uAC00\uC99D"),
    buildNow: s("Build it now", "X\xE2y ngay", "\uC9C0\uAE08 \uC9D3\uAE30"),
    backCity: s("Back to the city", "V\u1EC1 th\xE0nh ph\u1ED1", "\uB3C4\uC2DC\uB85C \uB3CC\uC544\uAC00\uAE30"),
    decoUnlocked: s("New decoration for this building: {d}", "Trang tr\xED m\u1EDBi cho c\xF4ng tr\xECnh n\xE0y: {d}", "\uC774 \uAC74\uBB3C\uC758 \uC0C8 \uC7A5\uC2DD: {d}"),
    breakTime: s("You finished {n} missions in this visit. A good time to rest your eyes and play away from the screen!", "B\u1EA1n \u0111\xE3 xong {n} nhi\u1EC7m v\u1EE5 trong l\u1EA7n ch\u01A1i n\xE0y. \u0110\xE3 \u0111\u1EBFn l\xFAc cho m\u1EAFt ngh\u1EC9 v\xE0 ch\u01A1i xa m\xE0n h\xECnh r\u1ED3i!", "\uC774\uBC88\uC5D0 \uBBF8\uC158\uC744 {n}\uAC1C \uB05D\uB0C8\uC5B4\uC694. \uC774\uC81C \uB208\uC744 \uC26C\uACE0 \uD654\uBA74 \uBC16\uC5D0\uC11C \uB180 \uC2DC\uAC04\uC774\uC5D0\uC694!"),
    inventory: s("Building inventory", "Kho c\xF4ng tr\xECnh", "\uAC74\uBB3C \uBCF4\uAD00\uD568"),
    ready: s("Ready to build", "S\u1EB5n s\xE0ng x\xE2y", "\uC9C0\uC744 \uC218 \uC788\uC5B4\uC694"),
    onMap: s("In the city", "\u0110\xE3 \u1EDF trong th\xE0nh ph\u1ED1", "\uB3C4\uC2DC\uC5D0 \uC788\uC5B4\uC694"),
    lockedBy: s("Mission: {m}", "Nhi\u1EC7m v\u1EE5: {m}", "\uBBF8\uC158: {m}"),
    tapPlot: s("Tap a glowing spot to build.", "Ch\u1EA1m v\xE0o \xF4 \u0111\u1EA5t \u0111ang s\xE1ng \u0111\u1EC3 x\xE2y.", "\uBE5B\uB098\uB294 \uC790\uB9AC\uB97C \uB20C\uB7EC \uC9C0\uC5B4\uC694."),
    constructing: s("Building\u2026", "\u0110ang x\xE2y\u2026", "\uC9D3\uB294 \uC911\u2026"),
    weLearn: s("What we learn here", "\u1EDE \u0111\xE2y ch\xFAng ta h\u1ECDc", "\uC5EC\uAE30\uC11C \uBC30\uC6B0\uB294 \uAC83"),
    practiceHere: s("Practice here", "Luy\u1EC7n t\u1EADp \u1EDF \u0111\xE2y", "\uC5EC\uAE30\uC11C \uC5F0\uC2B5\uD558\uAE30"),
    decorate: s("Decorate", "Trang tr\xED", "\uAFB8\uBBF8\uAE30"),
    move: s("Move", "Di chuy\u1EC3n", "\uC62E\uAE30\uAE30"),
    color: s("Color", "M\xE0u s\u1EAFc", "\uC0C9\uAE54"),
    decoration: s("Decoration", "\u0110\u1ED3 trang tr\xED", "\uC7A5\uC2DD"),
    d_none: s("None", "Kh\xF4ng", "\uC5C6\uC74C"),
    d_flowers: s("Flowers", "Hoa", "\uAF43"),
    d_flag: s("Flag", "C\u1EDD", "\uAE43\uBC1C"),
    d_lights: s("Lights", "\u0110\xE8n", "\uC870\uBA85"),
    practiceToUnlock: s("Practice {n}\xD7 to unlock", "Luy\u1EC7n t\u1EADp {n} l\u1EA7n \u0111\u1EC3 m\u1EDF", "{n}\uBC88 \uC5F0\uC2B5\uD558\uBA74 \uC5F4\uB824\uC694"),
    achievements: s("City Achievements", "Th\xE0nh t\xEDch th\xE0nh ph\u1ED1", "\uB3C4\uC2DC \uC5C5\uC801"),
    cityGrowth: s("City growth", "S\u1EF1 ph\xE1t tri\u1EC3n c\u1EE7a th\xE0nh ph\u1ED1", "\uB3C4\uC2DC \uC131\uC7A5"),
    milestones: s("Learning milestones", "C\u1ED9t m\u1ED1c h\u1ECDc t\u1EADp", "\uD559\uC2B5 \uC131\uACFC"),
    missionsDone: s("Completed missions", "Nhi\u1EC7m v\u1EE5 \u0111\xE3 ho\xE0n th\xE0nh", "\uC644\uB8CC\uD55C \uBBF8\uC158"),
    buildingsUnlocked: s("Unlocked buildings", "C\xF4ng tr\xECnh \u0111\xE3 m\u1EDF", "\uC5F4\uB9B0 \uAC74\uBB3C"),
    noneYet: s("Nothing here yet. Your first mission is waiting!", "Ch\u01B0a c\xF3 g\xEC \u1EDF \u0111\xE2y. Nhi\u1EC7m v\u1EE5 \u0111\u1EA7u ti\xEAn \u0111ang ch\u1EDD b\u1EA1n!", "\uC544\uC9C1 \uC544\uBB34\uAC83\uB3C4 \uC5C6\uC5B4\uC694. \uCCAB \uBBF8\uC158\uC774 \uAE30\uB2E4\uB9AC\uACE0 \uC788\uC5B4\uC694!"),
    ms_first: s("First Builder", "Ng\u01B0\u1EDDi x\xE2y \u0111\u1EA7u ti\xEAn", "\uCCAB \uAC74\uCD95\uAC00"),
    ms_polite: s("Polite Speaker", "Ng\u01B0\u1EDDi n\xF3i l\u1ECBch s\u1EF1", "\uC608\uC758 \uBC14\uB978 \uB9D0\uD558\uAE30"),
    ms_reader: s("Book Explorer", "Nh\xE0 th\xE1m hi\u1EC3m s\xE1ch", "\uCC45 \uD0D0\uD5D8\uAC00"),
    ms_kind: s("Kind Friend", "Ng\u01B0\u1EDDi b\u1EA1n t\u1EED t\u1EBF", "\uB2E4\uC815\uD55C \uCE5C\uAD6C"),
    ms_green: s("Park Helper", "Ng\u01B0\u1EDDi gi\xFAp c\xF4ng vi\xEAn", "\uACF5\uC6D0 \uB3C4\uC6B0\uBBF8"),
    ms_safe: s("Safety Star", "Ng\xF4i sao an to\xE0n", "\uC548\uC804 \uC2A4\uD0C0"),
    ms_culture: s("Culture Explorer", "Nh\xE0 kh\xE1m ph\xE1 v\u0103n h\xF3a", "\uBB38\uD654 \uD0D0\uD5D8\uAC00"),
    ms_helper: s("Community Helper", "Ng\u01B0\u1EDDi gi\xFAp c\u1ED9ng \u0111\u1ED3ng", "\uB9C8\uC744 \uB3C4\uC6B0\uBBF8"),
    ms_town: s("Town Maker (5 buildings)", "Ng\u01B0\u1EDDi x\xE2y th\u1ECB tr\u1EA5n (5 c\xF4ng tr\xECnh)", "\uB3D9\uB124 \uAC74\uCD95\uAC00 (\uAC74\uBB3C 5\uAC1C)"),
    ms_cityMaker: s("City Maker (10 buildings)", "Ng\u01B0\u1EDDi ki\u1EBFn t\u1EA1o th\xE0nh ph\u1ED1 (10 c\xF4ng tr\xECnh)", "\uB3C4\uC2DC \uAC74\uCD95\uAC00 (\uAC74\uBB3C 10\uAC1C)"),
    parentTitle: s("Parent Dashboard", "B\u1EA3ng theo d\xF5i d\xE0nh cho ph\u1EE5 huynh", "\uBCF4\uD638\uC790 \uB300\uC2DC\uBCF4\uB4DC"),
    gateQ: s("Grown-ups only. What is {a} \xD7 {b}?", "Ch\u1EC9 d\xE0nh cho ng\u01B0\u1EDDi l\u1EDBn. {a} \xD7 {b} b\u1EB1ng bao nhi\xEAu?", "\uBCF4\uD638\uC790 \uC804\uC6A9\uC785\uB2C8\uB2E4. {a} \xD7 {b}\uB294 \uC5BC\uB9C8\uC778\uAC00\uC694?"),
    gateWrong: s("That is not right. Please try again.", "Ch\u01B0a \u0111\xFAng. Vui l\xF2ng th\u1EED l\u1EA1i.", "\uD2C0\uB838\uC5B4\uC694. \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694."),
    open: s("Open", "M\u1EDF", "\uC5F4\uAE30"),
    modeLabel: s("Learning mode", "Ch\u1EBF \u0111\u1ED9 h\u1ECDc", "\uD559\uC2B5 \uBAA8\uB4DC"),
    modeNote: s("Children develop at different speeds. Choose the mode that fits your child, not only their age.", "M\u1ED7i tr\u1EBB ph\xE1t tri\u1EC3n theo t\u1ED1c \u0111\u1ED9 ri\xEAng. H\xE3y ch\u1ECDn ch\u1EBF \u0111\u1ED9 ph\xF9 h\u1EE3p v\u1EDBi con, kh\xF4ng ch\u1EC9 d\u1EF1a v\xE0o tu\u1ED5i.", "\uC544\uC774\uB9C8\uB2E4 \uBC1C\uB2EC \uC18D\uB3C4\uAC00 \uB2EC\uB77C\uC694. \uB098\uC774\uB9CC \uBCF4\uC9C0 \uB9D0\uACE0 \uC544\uC774\uC5D0\uAC8C \uB9DE\uB294 \uBAA8\uB4DC\uB97C \uACE8\uB77C \uC8FC\uC138\uC694."),
    overview: s("Overview", "T\u1ED5ng quan", "\uC694\uC57D"),
    engSkills: s("English skills practiced", "K\u1EF9 n\u0103ng ti\u1EBFng Anh \u0111\xE3 luy\u1EC7n", "\uC5F0\uC2B5\uD55C \uC601\uC5B4 \uAE30\uB2A5"),
    lifeSkills: s("Life skills and values practiced", "K\u1EF9 n\u0103ng s\u1ED1ng v\xE0 gi\xE1 tr\u1ECB \u0111\xE3 luy\u1EC7n", "\uC5F0\uC2B5\uD55C \uC0DD\uD65C \uAE30\uC220\uACFC \uAC00\uCE58"),
    activities: s("{n} activities", "{n} ho\u1EA1t \u0111\u1ED9ng", "\uD65C\uB3D9 {n}\uAC1C"),
    notYet: s("Not practiced yet", "Ch\u01B0a luy\u1EC7n", "\uC544\uC9C1 \uC5F0\uC2B5 \uC804"),
    words: s("Words met", "T\u1EEB \u0111\xE3 g\u1EB7p", "\uB9CC\uB09C \uB2E8\uC5B4"),
    sentences: s("Sentences practiced", "C\xE2u \u0111\xE3 luy\u1EC7n", "\uC5F0\uC2B5\uD55C \uBB38\uC7A5"),
    aboutData: s("Safety and data", "An to\xE0n v\xE0 d\u1EEF li\u1EC7u", "\uC548\uC804\uACFC \uB370\uC774\uD130"),
    savedOk: s("Progress is saved in this browser only. Nothing is sent anywhere.", "Ti\u1EBFn \u0111\u1ED9 ch\u1EC9 \u0111\u01B0\u1EE3c l\u01B0u tr\xEAn tr\xECnh duy\u1EC7t n\xE0y. Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u n\xE0o \u0111\u01B0\u1EE3c g\u1EEDi \u0111i.", "\uC9C4\uD589 \uC0C1\uD669\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB418\uBA70 \uC5B4\uB514\uC5D0\uB3C4 \uC804\uC1A1\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."),
    savedNo: s("This browser is blocking storage, so progress will be lost when the page closes.", "Tr\xECnh duy\u1EC7t n\xE0y \u0111ang ch\u1EB7n l\u01B0u tr\u1EEF n\xEAn ti\u1EBFn \u0111\u1ED9 s\u1EBD m\u1EA5t khi \u0111\xF3ng trang.", "\uC774 \uBE0C\uB77C\uC6B0\uC800\uAC00 \uC800\uC7A5\uC744 \uCC28\uB2E8\uD558\uACE0 \uC788\uC5B4 \uD398\uC774\uC9C0\uB97C \uB2EB\uC73C\uBA74 \uC9C4\uD589 \uC0C1\uD669\uC774 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."),
    noPersonal: s("The game never asks for a name, address, school or phone number. There is no leaderboard, no chat and nothing to buy.", "Tr\xF2 ch\u01A1i kh\xF4ng bao gi\u1EDD h\u1ECFi t\xEAn, \u0111\u1ECBa ch\u1EC9, tr\u01B0\u1EDDng h\u1ECDc hay s\u1ED1 \u0111i\u1EC7n tho\u1EA1i. Kh\xF4ng c\xF3 b\u1EA3ng x\u1EBFp h\u1EA1ng, kh\xF4ng tr\xF2 chuy\u1EC7n v\xE0 kh\xF4ng c\xF3 g\xEC \u0111\u1EC3 mua.", "\uC774 \uAC8C\uC784\uC740 \uC774\uB984, \uC8FC\uC18C, \uD559\uAD50, \uC804\uD654\uBC88\uD638\uB97C \uBB3B\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC21C\uC704\uD45C, \uCC44\uD305, \uAD6C\uB9E4 \uC694\uC18C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."),
    contentNote: s("All activities use fixed, pre-written content. No live AI talks with your child. Speaking steps are not recorded or checked. Audio uses your device's built-in voice.", "M\u1ECDi ho\u1EA1t \u0111\u1ED9ng d\xF9ng n\u1ED9i dung so\u1EA1n s\u1EB5n. Kh\xF4ng c\xF3 AI tr\xF2 chuy\u1EC7n tr\u1EF1c ti\u1EBFp v\u1EDBi tr\u1EBB. Ph\u1EA7n luy\u1EC7n n\xF3i kh\xF4ng \u0111\u01B0\u1EE3c ghi \xE2m hay ch\u1EA5m \u0111i\u1EC3m. \xC2m thanh d\xF9ng gi\u1ECDng \u0111\u1ECDc c\xF3 s\u1EB5n tr\xEAn thi\u1EBFt b\u1ECB.", "\uBAA8\uB4E0 \uD65C\uB3D9\uC740 \uBBF8\uB9AC \uC791\uC131\uB41C \uB0B4\uC6A9\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uC544\uC774\uC640 \uC2E4\uC2DC\uAC04\uC73C\uB85C \uB300\uD654\uD558\uB294 AI\uB294 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9D0\uD558\uAE30 \uB2E8\uACC4\uB294 \uB179\uC74C\uD558\uAC70\uB098 \uD3C9\uAC00\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC74C\uC131\uC740 \uAE30\uAE30\uC758 \uAE30\uBCF8 \uC74C\uC131\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."),
    reset: s("Reset progress", "X\xF3a ti\u1EBFn \u0111\u1ED9", "\uC9C4\uD589 \uC0C1\uD669 \uCD08\uAE30\uD654"),
    resetAsk: s("Erase the city and all progress? This cannot be undone.", "X\xF3a th\xE0nh ph\u1ED1 v\xE0 to\xE0n b\u1ED9 ti\u1EBFn \u0111\u1ED9? Kh\xF4ng th\u1EC3 ho\xE0n t\xE1c.", "\uB3C4\uC2DC\uC640 \uBAA8\uB4E0 \uC9C4\uD589 \uC0C1\uD669\uC744 \uC9C0\uC6B8\uAE4C\uC694? \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."),
    resetYes: s("Yes, erase", "C\xF3, x\xF3a", "\uB124, \uC9C0\uC6B8\uAC8C\uC694"),
    sk_listening: s("Listening", "Nghe", "\uB4E3\uAE30"),
    sk_speaking: s("Speaking", "N\xF3i", "\uB9D0\uD558\uAE30"),
    sk_reading: s("Reading", "\u0110\u1ECDc", "\uC77D\uAE30"),
    sk_writing: s("Writing", "Vi\u1EBFt", "\uC4F0\uAE30"),
    sk_vocabulary: s("Vocabulary", "T\u1EEB v\u1EF1ng", "\uC5B4\uD718"),
    sk_polite: s("Politeness", "L\u1ECBch s\u1EF1", "\uC608\uC808"),
    sk_kindness: s("Kindness and sharing", "T\u1EED t\u1EBF v\xE0 chia s\u1EBB", "\uCE5C\uC808\uACFC \uB098\uB214"),
    sk_responsibility: s("Responsibility", "Tr\xE1ch nhi\u1EC7m", "\uCC45\uC784\uAC10"),
    sk_empathy: s("Empathy", "\u0110\u1ED3ng c\u1EA3m", "\uACF5\uAC10"),
    sk_safety: s("Personal safety", "An to\xE0n c\xE1 nh\xE2n", "\uAC1C\uC778 \uC548\uC804"),
    sk_culture: s("Cultural awareness", "Hi\u1EC3u bi\u1EBFt v\u0103n h\xF3a", "\uBB38\uD654 \uC774\uD574"),
    sk_thinking: s("Thinking and problem-solving", "T\u01B0 duy v\xE0 gi\u1EA3i quy\u1EBFt v\u1EA5n \u0111\u1EC1", "\uC0DD\uAC01\uD558\uAE30\uC640 \uBB38\uC81C \uD574\uACB0"),
    sk_courage: s("Courage", "D\u0169ng c\u1EA3m", "\uC6A9\uAE30"),
    sk_belonging: s("Home and belonging", "Gia \u0111\xECnh v\xE0 s\u1EF1 g\u1EAFn b\xF3", "\uAC00\uC815\uACFC \uC18C\uC18D\uAC10"),
    c_home: s("Home Street", "Ph\u1ED1 Nh\xE0 \u1EDE", "\uC8FC\uD0DD\uAC00"),
    c_learn: s("Learning Corner", "G\xF3c H\u1ECDc T\u1EADp", "\uBC30\uC6C0 \uB9C8\uB2F9"),
    c_community: s("Helpers' Square", "Qu\u1EA3ng tr\u01B0\u1EDDng Gi\xFAp \u0110\u1EE1", "\uB3C4\uC6C0 \uAD11\uC7A5"),
    c_shop: s("Shop Street", "Ph\u1ED1 Mua S\u1EAFm", "\uC0C1\uC810\uAC00"),
    c_culture: s("Culture Quarter", "Khu V\u0103n H\xF3a", "\uBB38\uD654 \uC9C0\uAD6C"),
    c_green: s("Green Corner", "G\xF3c Xanh", "\uCD08\uB85D \uB9C8\uB2F9")
  };
  var PRAISE = ["Great job!", "You did it!", "Wonderful!", "Nice work!"];
  function makeT(lang) {
    return (key, vars) => {
      const entry = UI[key];
      let out = entry ? entry[lang] ?? entry.en : key;
      if (vars) for (const k in vars) out = out.replaceAll(`{${k}}`, vars[k]);
      return out;
    };
  }
  var loc = (v2, lang) => v2 == null ? "" : typeof v2 === "string" ? v2 : v2[lang] ?? v2.en;
  var sup = (v2, lang) => lang !== "en" && v2 && typeof v2 === "object" ? v2[lang] ?? null : null;

  // src/data/buildings.js
  var s2 = (en, vi, ko) => ({ en, vi, ko });
  var BUILDINGS = [
    {
      id: "home",
      cat: "home",
      mission: "m-home",
      color: 0,
      name: s2("Little Home", "Ng\xF4i nh\xE0 nh\u1ECF", "\uC791\uC740 \uC9D1"),
      learn: s2("Family, home and daily routines", "Gia \u0111\xECnh, ng\xF4i nh\xE0 v\xE0 sinh ho\u1EA1t h\u1EB1ng ng\xE0y", "\uAC00\uC871, \uC9D1, \uD558\uB8E8 \uC77C\uACFC")
    },
    {
      id: "bakery",
      cat: "shop",
      mission: "m-bakery",
      color: 1,
      name: s2("Bakery", "Ti\u1EC7m b\xE1nh", "\uBE75\uC9D1"),
      learn: s2("Food words and polite requests", "T\u1EEB v\u1EC1 \u0111\u1ED3 \u0103n v\xE0 l\u1EDDi \u0111\u1EC1 ngh\u1ECB l\u1ECBch s\u1EF1", "\uC74C\uC2DD \uB2E8\uC5B4\uC640 \uACF5\uC190\uD55C \uBD80\uD0C1")
    },
    {
      id: "library",
      cat: "learn",
      mission: "m-library",
      color: 4,
      name: s2("Library", "Th\u01B0 vi\u1EC7n", "\uB3C4\uC11C\uAD00"),
      learn: s2("Reading stories and caring for shared books", "\u0110\u1ECDc truy\u1EC7n v\xE0 gi\u1EEF g\xECn s\xE1ch chung", "\uC774\uC57C\uAE30 \uC77D\uAE30\uC640 \uD568\uAED8 \uC4F0\uB294 \uCC45 \uC544\uB07C\uAE30")
    },
    {
      id: "park",
      cat: "green",
      mission: "m-park",
      color: 1,
      name: s2("Park", "C\xF4ng vi\xEAn", "\uACF5\uC6D0"),
      learn: s2("Caring for shared spaces and sorting trash", "Gi\u1EEF g\xECn kh\xF4ng gian chung v\xE0 ph\xE2n lo\u1EA1i r\xE1c", "\uD568\uAED8 \uC4F0\uB294 \uACF5\uAC04 \uB3CC\uBCF4\uAE30\uC640 \uBD84\uB9AC\uBC30\uCD9C")
    },
    {
      id: "toyshop",
      cat: "shop",
      mission: "m-toy",
      color: 3,
      name: s2("Toy Shop", "C\u1EEDa h\xE0ng \u0111\u1ED3 ch\u01A1i", "\uC7A5\uB09C\uAC10 \uAC00\uAC8C"),
      learn: s2("Sharing, taking turns and friendship", "Chia s\u1EBB, ch\u01A1i l\u1EA7n l\u01B0\u1EE3t v\xE0 t\xECnh b\u1EA1n", "\uB098\uB204\uAE30, \uCC28\uB840 \uC9C0\uD0A4\uAE30, \uC6B0\uC815")
    },
    {
      id: "center",
      cat: "community",
      mission: "m-center",
      color: 0,
      name: s2("Community Center", "Nh\xE0 c\u1ED9ng \u0111\u1ED3ng", "\uC8FC\uBBFC \uC13C\uD130"),
      learn: s2("Feelings words and kind, supportive answers", "T\u1EEB v\u1EC1 c\u1EA3m x\xFAc v\xE0 l\u1EDDi n\xF3i \xE2n c\u1EA7n", "\uAC10\uC815 \uB2E8\uC5B4\uC640 \uB2E4\uC815\uD55C \uB9D0")
    },
    {
      id: "hospital",
      cat: "community",
      mission: "m-hospital",
      color: 5,
      name: s2("Hospital", "B\u1EC7nh vi\u1EC7n", "\uBCD1\uC6D0"),
      learn: s2("Community helpers and asking for help", "Nh\u1EEFng ng\u01B0\u1EDDi gi\xFAp \u0111\u1EE1 c\u1ED9ng \u0111\u1ED3ng v\xE0 c\xE1ch nh\u1EDD gi\xFAp \u0111\u1EE1", "\uB9C8\uC744\uC758 \uB3C4\uC6B0\uBBF8\uC640 \uB3C4\uC6C0 \uCCAD\uD558\uAE30")
    },
    {
      id: "police",
      cat: "community",
      mission: "m-police",
      color: 2,
      name: s2("Police Station", "\u0110\u1ED3n c\u1EA3nh s\xE1t", "\uACBD\uCC30\uC11C"),
      learn: s2("Personal safety and trusted grown-ups", "An to\xE0n c\xE1 nh\xE2n v\xE0 ng\u01B0\u1EDDi l\u1EDBn \u0111\xE1ng tin c\u1EADy", "\uAC1C\uC778 \uC548\uC804\uACFC \uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978")
    },
    {
      id: "plaza",
      cat: "culture",
      mission: "m-tet",
      color: 1,
      name: s2("Festival Plaza", "Qu\u1EA3ng tr\u01B0\u1EDDng L\u1EC5 h\u1ED9i", "\uCD95\uC81C \uAD11\uC7A5"),
      learn: s2("T\u1EBFt traditions and New Year wishes", "Phong t\u1EE5c ng\xE0y T\u1EBFt v\xE0 l\u1EDDi ch\xFAc n\u0103m m\u1EDBi", "\uB5CF(\uBCA0\uD2B8\uB0A8 \uC124) \uD48D\uC2B5\uACFC \uC0C8\uD574 \uC778\uC0AC")
    },
    {
      id: "culture",
      cat: "culture",
      mission: "m-chuseok",
      color: 5,
      name: s2("Culture House", "Nh\xE0 V\u0103n h\xF3a", "\uBB38\uD654\uC758 \uC9D1"),
      learn: s2("Chuseok traditions and saying thank you", "Phong t\u1EE5c Chuseok v\xE0 l\u1EDDi c\u1EA3m \u01A1n", "\uCD94\uC11D \uD48D\uC2B5\uACFC \uAC10\uC0AC \uD45C\uD604")
    }
  ];
  var BUILDINGS_BY_ID = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]));
  var TOTAL_BUILDINGS = BUILDINGS.length;
  var DISTRICT = [
    ["learn", "learn", "culture", "culture"],
    ["home", "home", "community", "community"],
    ["shop", "shop", "green", "green"]
  ];
  var PLOTS = DISTRICT.flatMap((row, j) => row.map((district, i) => ({ id: `p${j * 4 + i}`, i, j, district })));
  var PLOTS_BY_ID = Object.fromEntries(PLOTS.map((p) => [p.id, p]));
  var DECOS = [
    { id: "none", needs: 0 },
    { id: "flowers", needs: 0 },
    { id: "flag", needs: 1 },
    // unlocked after practising in the building once
    { id: "lights", needs: 2 }
    // ... twice
  ];

  // src/data/missions.js
  var s3 = (en, vi, ko) => ({ en, vi, ko });
  var h = (vi, ko) => ({ vi, ko });
  var v = (w, e, vi, ko) => ({ w, e, vi, ko });
  var MISSIONS = [
    {
      id: "m-home",
      building: "home",
      pillar: "english",
      age: "4\u201310",
      needs: 0,
      skills: ["belonging"],
      who: ["mai"],
      title: s3("My Little Home", "Ng\xF4i nh\xE0 nh\u1ECF c\u1EE7a m\xECnh", "\uB098\uC758 \uC791\uC740 \uC9D1"),
      objective: s3("Learn home words and say \u201CThis is my home.\u201D", "H\u1ECDc t\u1EEB v\u1EC1 ng\xF4i nh\xE0 v\xE0 n\xF3i \u201CThis is my home.\u201D", "\uC9D1\uC5D0 \uAD00\uD55C \uB2E8\uC5B4\uB97C \uBC30\uC6B0\uACE0 \u201CThis is my home.\u201D\uC774\uB77C\uACE0 \uB9D0\uD574\uC694."),
      scenario: s3("The land is empty and Mai needs a home. Learn the words to build it!", "M\u1EA3nh \u0111\u1EA5t c\xF2n tr\u1ED1ng v\xE0 Mai c\u1EA7n m\u1ED9t ng\xF4i nh\xE0. H\xE3y h\u1ECDc t\u1EEB m\u1EDBi \u0111\u1EC3 x\xE2y nh\xE0 nh\xE9!", "\uB545\uC774 \uBE44\uC5B4 \uC788\uACE0 \uB9C8\uC774\uC5D0\uAC8C\uB294 \uC9D1\uC774 \uD544\uC694\uD574\uC694. \uB2E8\uC5B4\uB97C \uBC30\uC6B0\uACE0 \uC9D1\uC744 \uC9C0\uC5B4\uC694!"),
      lesson: s3("A home is a place where people care for each other.", "Nh\xE0 l\xE0 n\u01A1i m\u1ECDi ng\u01B0\u1EDDi quan t\xE2m v\xE0 ch\u0103m s\xF3c l\u1EABn nhau.", "\uC9D1\uC740 \uC11C\uB85C\uB97C \uC544\uB07C\uACE0 \uB3CC\uBCF4\uB294 \uACF3\uC774\uC5D0\uC694."),
      feedback: s3("Great work! You can talk about your home.", "Gi\u1ECFi l\u1EAFm! B\u1EA1n \u0111\xE3 bi\u1EBFt n\xF3i v\u1EC1 ng\xF4i nh\xE0 c\u1EE7a m\xECnh.", "\uC798\uD588\uC5B4\uC694! \uC774\uC81C \uC9D1\uC5D0 \uB300\uD574 \uB9D0\uD560 \uC218 \uC788\uC5B4\uC694."),
      vocab: [v("home", "\u{1F3E0}", "nh\xE0", "\uC9D1"), v("door", "\u{1F6AA}", "c\u1EEDa", "\uBB38"), v("bed", "\u{1F6CF}\uFE0F", "gi\u01B0\u1EDDng", "\uCE68\uB300"), v("family", "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", "gia \u0111\xECnh", "\uAC00\uC871"), v("key", "\u{1F511}", "ch\xECa kh\xF3a", "\uC5F4\uC1E0")],
      target: "This is my home.",
      targetHelp: h("\u0110\xE2y l\xE0 nh\xE0 c\u1EE7a m\xECnh.", "\uC5EC\uAE30\uB294 \uC6B0\uB9AC \uC9D1\uC774\uC5D0\uC694."),
      steps: {
        little: [
          { t: "pick", q: "Where is the door?", h: h("C\xE1i c\u1EEDa \u1EDF \u0111\xE2u?", "\uBB38\uC740 \uC5B4\uB514\uC5D0 \uC788\uB098\uC694?"), opts: ["door", "bed", "key"], a: "door" },
          { t: "pick", q: "Who lives in a home? Find the family.", h: h("Ai s\u1ED1ng trong nh\xE0? H\xE3y t\xECm gia \u0111\xECnh.", "\uC9D1\uC5D0\uB294 \uB204\uAC00 \uC0B4\uAE4C\uC694? \uAC00\uC871\uC744 \uCC3E\uC544\uC694."), opts: ["family", "key", "bed"], a: "family" },
          { t: "order", q: "Spell the word.", h: h("Gh\xE9p ch\u1EEF th\xE0nh t\u1EEB.", "\uAE00\uC790\uB97C \uB9DE\uCDB0 \uB2E8\uC5B4\uB97C \uB9CC\uB4E4\uC5B4\uC694."), letters: true, pic: "\u{1F3E0}", words: ["h", "o", "m", "e"] },
          { t: "say", s: "This is my home." }
        ],
        junior: [
          { t: "pick", q: "We sleep in a ___.", h: h("Ch\xFAng ta ng\u1EE7 tr\xEAn ___.", "\uC6B0\uB9AC\uB294 ___\uC5D0\uC11C \uC790\uC694."), opts: ["bed", "door", "key"], a: "bed" },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["This", "is", "my", "home."] },
          { t: "type", pic: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", pre: "My", post: "lives in my home.", a: "family" },
          { t: "pick", passage: "Mai lives in a little home. It has a blue door. Her family eats dinner together every evening.", q: "What color is the door?", h: h("C\xE1i c\u1EEDa m\xE0u g\xEC?", "\uBB38\uC740 \uBB34\uC2A8 \uC0C9\uC778\uAC00\uC694?"), opts: ["Blue", "Red", "Green"], a: "Blue" },
          { t: "say", s: "This is my home. I live with my family." }
        ]
      }
    },
    {
      id: "m-bakery",
      building: "bakery",
      pillar: "english",
      age: "5\u20137",
      needs: 1,
      skills: ["polite"],
      who: ["sofia"],
      title: s3("Welcome to the Bakery", "Ch\xE0o m\u1EEBng \u0111\u1EBFn ti\u1EC7m b\xE1nh", "\uBE75\uC9D1\uC5D0 \uC624\uC2E0 \uAC83\uC744 \uD658\uC601\uD574\uC694"),
      objective: s3("Practice food vocabulary and polite requests.", "Luy\u1EC7n t\u1EEB v\u1EF1ng v\u1EC1 \u0111\u1ED3 \u0103n v\xE0 l\u1EDDi \u0111\u1EC1 ngh\u1ECB l\u1ECBch s\u1EF1.", "\uC74C\uC2DD \uB2E8\uC5B4\uC640 \uACF5\uC190\uD558\uAC8C \uBD80\uD0C1\uD558\uB294 \uB9D0\uC744 \uC5F0\uC2B5\uD574\uC694."),
      scenario: s3("Sofia comes into the bakery. She wants to buy a cake.", "Sofia b\u01B0\u1EDBc v\xE0o ti\u1EC7m b\xE1nh. B\u1EA1n \u1EA5y mu\u1ED1n mua m\u1ED9t chi\u1EBFc b\xE1nh kem.", "\uC18C\uD53C\uC544\uAC00 \uBE75\uC9D1\uC5D0 \uB4E4\uC5B4\uC640\uC694. \uCF00\uC774\uD06C\uB97C \uC0AC\uACE0 \uC2F6\uC5B4 \uD574\uC694."),
      lesson: s3("Being polite helps people communicate respectfully.", "L\u1ECBch s\u1EF1 gi\xFAp m\u1ECDi ng\u01B0\u1EDDi tr\xF2 chuy\u1EC7n v\u1EDBi s\u1EF1 t\xF4n tr\u1ECDng.", "\uACF5\uC190\uD558\uAC8C \uB9D0\uD558\uBA74 \uC11C\uB85C \uC874\uC911\uD558\uBA70 \uC774\uC57C\uAE30\uD560 \uC218 \uC788\uC5B4\uC694."),
      feedback: s3("Wonderful! You used polite English.", "Tuy\u1EC7t v\u1EDDi! B\u1EA1n \u0111\xE3 d\xF9ng ti\u1EBFng Anh th\u1EADt l\u1ECBch s\u1EF1.", "\uD6CC\uB96D\uD574\uC694! \uACF5\uC190\uD55C \uC601\uC5B4\uB97C \uC37C\uC5B4\uC694."),
      vocab: [v("bread", "\u{1F35E}", "b\xE1nh m\xEC", "\uBE75"), v("cake", "\u{1F382}", "b\xE1nh kem", "\uCF00\uC774\uD06C"), v("cookie", "\u{1F36A}", "b\xE1nh quy", "\uCFE0\uD0A4"), v("milk", "\u{1F95B}", "s\u1EEFa", "\uC6B0\uC720"), v("apple", "\u{1F34E}", "qu\u1EA3 t\xE1o", "\uC0AC\uACFC")],
      target: "I would like a cake, please.",
      targetHelp: h("Cho m\xECnh m\u1ED9t chi\u1EBFc b\xE1nh kem \u1EA1.", "\uCF00\uC774\uD06C \uD558\uB098 \uC8FC\uC138\uC694."),
      steps: {
        little: [
          { t: "pick", q: "Sofia wants a cake. Tap the cake.", h: h("Sofia mu\u1ED1n b\xE1nh kem. H\xE3y ch\u1EA1m v\xE0o b\xE1nh kem.", "\uC18C\uD53C\uC544\uB294 \uCF00\uC774\uD06C\uB97C \uC6D0\uD574\uC694. \uCF00\uC774\uD06C\uB97C \uB20C\uB7EC\uC694."), opts: ["cake", "bread", "apple"], a: "cake" },
          { t: "pick", q: "Now she wants milk. Tap the milk.", h: h("B\xE2y gi\u1EDD b\u1EA1n \u1EA5y mu\u1ED1n s\u1EEFa. H\xE3y ch\u1EA1m v\xE0o s\u1EEFa.", "\uC774\uBC88\uC5D0\uB294 \uC6B0\uC720\uB97C \uC6D0\uD574\uC694. \uC6B0\uC720\uB97C \uB20C\uB7EC\uC694."), opts: ["cookie", "milk", "bread"], a: "milk" },
          { t: "order", q: "Ask politely.", h: h("H\xE3y h\u1ECFi th\u1EADt l\u1ECBch s\u1EF1.", "\uACF5\uC190\uD558\uAC8C \uBD80\uD0C1\uD574\uC694."), words: ["I would like", "a cake,", "please."] },
          { t: "say", s: "I would like a cake, please." }
        ],
        junior: [
          { t: "pick", q: "Sofia says, \u201CI would like some bread, please.\u201D What does she want?", h: h("Sofia mu\u1ED1n mua g\xEC?", "\uC18C\uD53C\uC544\uB294 \uBB34\uC5C7\uC744 \uC6D0\uD558\uB098\uC694?"), opts: ["bread", "cookie", "milk"], a: "bread" },
          { t: "order", q: "Build the polite sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u l\u1ECBch s\u1EF1.", "\uACF5\uC190\uD55C \uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["I", "would", "like", "a", "cake,", "please."] },
          { t: "type", pic: "\u{1F36A}", pre: "I would like a", post: ", please.", a: "cookie" },
          { t: "pick", q: "Which sentence is polite?", h: h("C\xE2u n\xE0o l\u1ECBch s\u1EF1?", "\uC5B4\uB290 \uBB38\uC7A5\uC774 \uACF5\uC190\uD55C\uAC00\uC694?"), opts: ["I would like an apple, please.", "Give me an apple.", "Apple. Now."], a: "I would like an apple, please." },
          { t: "say", s: "I would like a cake, please. Thank you!" }
        ]
      }
    },
    {
      id: "m-library",
      building: "library",
      pillar: "english",
      age: "4\u201310",
      needs: 1,
      skills: ["thinking"],
      who: ["leo"],
      title: s3("Story Time at the Library", "Gi\u1EDD k\u1EC3 chuy\u1EC7n \u1EDF th\u01B0 vi\u1EC7n", "\uB3C4\uC11C\uAD00 \uC774\uC57C\uAE30 \uC2DC\uAC04"),
      objective: s3("Read a short story and answer questions about it.", "\u0110\u1ECDc m\u1ED9t c\xE2u chuy\u1EC7n ng\u1EAFn v\xE0 tr\u1EA3 l\u1EDDi c\xE2u h\u1ECFi.", "\uC9E7\uC740 \uC774\uC57C\uAE30\uB97C \uC77D\uACE0 \uC9C8\uBB38\uC5D0 \uB2F5\uD574\uC694."),
      scenario: s3("The city needs a place for books. Finish the reading challenge to open the library!", "Th\xE0nh ph\u1ED1 c\u1EA7n m\u1ED9t n\u01A1i \u0111\u1EC3 s\xE1ch. H\xE3y ho\xE0n th\xE0nh th\u1EED th\xE1ch \u0111\u1ECDc \u0111\u1EC3 m\u1EDF th\u01B0 vi\u1EC7n!", "\uB3C4\uC2DC\uC5D0 \uCC45\uC744 \uB458 \uACF3\uC774 \uD544\uC694\uD574\uC694. \uC77D\uAE30 \uB3C4\uC804\uC744 \uB05D\uB0B4\uACE0 \uB3C4\uC11C\uAD00\uC744 \uC5F4\uC5B4\uC694!"),
      lesson: s3("Books help us learn new things. In a library, we share books and take care of them.", "S\xE1ch gi\xFAp ch\xFAng ta h\u1ECDc \u0111i\u1EC1u m\u1EDBi. \u1EDE th\u01B0 vi\u1EC7n, ch\xFAng ta d\xF9ng chung s\xE1ch v\xE0 gi\u1EEF g\xECn s\xE1ch.", "\uCC45\uC740 \uC0C8\uB85C\uC6B4 \uAC83\uC744 \uC54C\uB824 \uC918\uC694. \uB3C4\uC11C\uAD00\uC5D0\uC11C\uB294 \uCC45\uC744 \uD568\uAED8 \uC4F0\uACE0 \uC18C\uC911\uD788 \uB2E4\uB904\uC694."),
      feedback: s3("Well done! You are a book explorer.", "L\xE0m t\u1ED1t l\u1EAFm! B\u1EA1n l\xE0 nh\xE0 th\xE1m hi\u1EC3m s\xE1ch.", "\uC798\uD588\uC5B4\uC694! \uCC45 \uD0D0\uD5D8\uAC00\uAC00 \uB410\uC5B4\uC694."),
      vocab: [v("book", "\u{1F4D5}", "quy\u1EC3n s\xE1ch", "\uCC45"), v("library", "\u{1F3DB}\uFE0F", "th\u01B0 vi\u1EC7n", "\uB3C4\uC11C\uAD00"), v("read", "\u{1F440}", "\u0111\u1ECDc", "\uC77D\uB2E4"), v("quiet", "\u{1F92B}", "y\xEAn l\u1EB7ng", "\uC870\uC6A9\uD55C"), v("story", "\u2728", "c\xE2u chuy\u1EC7n", "\uC774\uC57C\uAE30")],
      target: "I like to read books.",
      targetHelp: h("M\xECnh th\xEDch \u0111\u1ECDc s\xE1ch.", "\uB098\uB294 \uCC45 \uC77D\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694."),
      steps: {
        little: [
          { t: "pick", q: "Tap the book.", h: h("H\xE3y ch\u1EA1m v\xE0o quy\u1EC3n s\xE1ch.", "\uCC45\uC744 \uB20C\uB7EC\uC694."), opts: ["book", ["\u26BD", "ball"], ["\u{1F34E}", "apple"]], a: "book" },
          { t: "pick", q: "We are quiet in the library. Tap \u201Cquiet\u201D.", h: h("\u1EDE th\u01B0 vi\u1EC7n ch\xFAng ta gi\u1EEF y\xEAn l\u1EB7ng. H\xE3y ch\u1EA1m v\xE0o \u201Cquiet\u201D.", "\uB3C4\uC11C\uAD00\uC5D0\uC11C\uB294 \uC870\uC6A9\uD788 \uD574\uC694. \u201Cquiet\u201D\uB97C \uB20C\uB7EC\uC694."), opts: ["quiet", ["\u{1F4E3}", "loud"]], a: "quiet" },
          { t: "order", q: "Spell the word.", h: h("Gh\xE9p ch\u1EEF th\xE0nh t\u1EEB.", "\uAE00\uC790\uB97C \uB9DE\uCDB0 \uB2E8\uC5B4\uB97C \uB9CC\uB4E4\uC5B4\uC694."), letters: true, pic: "\u{1F4D5}", words: ["b", "o", "o", "k"] },
          { t: "say", s: "I like to read books." }
        ],
        junior: [
          { t: "pick", passage: "Leo goes to the library on Saturday. He finds a book about robots. He reads quietly at a table. Then he borrows the book and takes it home.", q: "What is Leo\u2019s book about?", h: h("Quy\u1EC3n s\xE1ch c\u1EE7a Leo n\xF3i v\u1EC1 \u0111i\u1EC1u g\xEC?", "\uB808\uC624\uC758 \uCC45\uC740 \uBB34\uC5C7\uC5D0 \uAD00\uD55C \uCC45\uC778\uAC00\uC694?"), opts: ["Robots", "Animals", "Space"], a: "Robots" },
          { t: "pick", passage: "Leo goes to the library on Saturday. He finds a book about robots. He reads quietly at a table. Then he borrows the book and takes it home.", q: "How does Leo read?", h: h("Leo \u0111\u1ECDc s\xE1ch nh\u01B0 th\u1EBF n\xE0o?", "\uB808\uC624\uB294 \uC5B4\uB5BB\uAC8C \uCC45\uC744 \uC77D\uB098\uC694?"), opts: ["Quietly", "Loudly", "Quickly"], a: "Quietly" },
          { t: "pick", q: "Why are people quiet in a library?", h: h("V\xEC sao m\u1ECDi ng\u01B0\u1EDDi gi\u1EEF y\xEAn l\u1EB7ng trong th\u01B0 vi\u1EC7n?", "\uB3C4\uC11C\uAD00\uC5D0\uC11C\uB294 \uC65C \uC870\uC6A9\uD788 \uD560\uAE4C\uC694?"), opts: ["So everyone can read and think.", "Because the books are sleeping.", "Because talking is always bad."], a: "So everyone can read and think." },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["I", "like", "to", "read", "books."] },
          { t: "say", s: "I like to read books about robots." }
        ]
      }
    },
    {
      id: "m-park",
      building: "park",
      pillar: "life",
      age: "4\u201310",
      needs: 1,
      skills: ["responsibility"],
      who: ["sofia"],
      title: s3("Clean Up the Park", "D\u1ECDn s\u1EA1ch c\xF4ng vi\xEAn", "\uACF5\uC6D0\uC744 \uAE68\uB057\uD558\uAC8C"),
      objective: s3("Learn to care for shared spaces and sort trash.", "H\u1ECDc c\xE1ch gi\u1EEF g\xECn kh\xF4ng gian chung v\xE0 ph\xE2n lo\u1EA1i r\xE1c.", "\uD568\uAED8 \uC4F0\uB294 \uACF5\uAC04\uC744 \uB3CC\uBCF4\uACE0 \uC4F0\uB808\uAE30\uB97C \uBD84\uB9AC\uD558\uB294 \uBC95\uC744 \uBC30\uC6CC\uC694."),
      scenario: s3("Sofia forgot her trash after a picnic. Let\u2019s help her clean up the park!", "Sofia qu\xEAn d\u1ECDn r\xE1c sau bu\u1ED5i d\xE3 ngo\u1EA1i. C\xF9ng gi\xFAp b\u1EA1n \u1EA5y d\u1ECDn s\u1EA1ch c\xF4ng vi\xEAn nh\xE9!", "\uC18C\uD53C\uC544\uAC00 \uC18C\uD48D \uB4A4\uC5D0 \uC4F0\uB808\uAE30\uB97C \uAE5C\uBE61\uD588\uC5B4\uC694. \uD568\uAED8 \uACF5\uC6D0\uC744 \uCE58\uC6CC\uC694!"),
      lesson: s3("The park belongs to everyone. We all help take care of it.", "C\xF4ng vi\xEAn l\xE0 c\u1EE7a m\u1ECDi ng\u01B0\u1EDDi. T\u1EA5t c\u1EA3 ch\xFAng ta c\xF9ng gi\u1EEF g\xECn.", "\uACF5\uC6D0\uC740 \uBAA8\uB450\uC758 \uAC83\uC774\uC5D0\uC694. \uC6B0\uB9AC \uBAA8\uB450 \uD568\uAED8 \uB3CC\uBD10\uC694."),
      feedback: s3("Thank you! The park is clean again.", "C\u1EA3m \u01A1n b\u1EA1n! C\xF4ng vi\xEAn \u0111\xE3 s\u1EA1ch tr\u1EDF l\u1EA1i.", "\uACE0\uB9C8\uC6CC\uC694! \uACF5\uC6D0\uC774 \uB2E4\uC2DC \uAE68\uB057\uD574\uC84C\uC5B4\uC694."),
      vocab: [v("park", "\u{1F333}", "c\xF4ng vi\xEAn", "\uACF5\uC6D0"), v("trash", "\u{1F5D1}\uFE0F", "r\xE1c", "\uC4F0\uB808\uAE30"), v("bin", "\u267B\uFE0F", "th\xF9ng r\xE1c", "\uC4F0\uB808\uAE30\uD1B5"), v("paper", "\u{1F4C4}", "gi\u1EA5y", "\uC885\uC774"), v("clean", "\u2728", "s\u1EA1ch", "\uAE68\uB057\uD55C")],
      target: "Let\u2019s keep the park clean.",
      targetHelp: h("Ch\xFAng ta h\xE3y gi\u1EEF c\xF4ng vi\xEAn s\u1EA1ch s\u1EBD.", "\uACF5\uC6D0\uC744 \uAE68\uB057\uD558\uAC8C \uC9C0\uCF1C\uC694."),
      steps: {
        little: [
          { t: "pick", q: "Where does trash go? Tap the bin.", h: h("R\xE1c b\u1ECF v\xE0o \u0111\xE2u? H\xE3y ch\u1EA1m v\xE0o th\xF9ng r\xE1c.", "\uC4F0\uB808\uAE30\uB294 \uC5B4\uB514\uC5D0 \uBC84\uB9B4\uAE4C\uC694? \uC4F0\uB808\uAE30\uD1B5\uC744 \uB20C\uB7EC\uC694."), opts: ["bin", ["\u{1F33C}", "flower"], ["\u{1F986}", "duck"]], a: "bin" },
          {
            t: "sort",
            q: "Put the trash in the right bin.",
            h: h("B\u1ECF r\xE1c v\xE0o \u0111\xFAng th\xF9ng.", "\uC4F0\uB808\uAE30\uB97C \uC54C\uB9DE\uC740 \uD1B5\uC5D0 \uB123\uC5B4\uC694."),
            bins: [{ id: "paper", l: "Paper", e: "\u{1F4C4}", vi: "Gi\u1EA5y", ko: "\uC885\uC774" }, { id: "food", l: "Food", e: "\u{1F37D}\uFE0F", vi: "Th\u1EE9c \u0103n th\u1EEBa", ko: "\uC74C\uC2DD\uBB3C" }],
            items: [{ e: "\u{1F4F0}", l: "newspaper", bin: "paper" }, { e: "\u{1F34C}", l: "banana peel", bin: "food" }, { e: "\u{1F4E6}", l: "box", bin: "paper" }, { e: "\u{1F34E}", l: "apple core", bin: "food" }]
          },
          { t: "order", q: "Say what we do.", h: h("N\xF3i \u0111i\u1EC1u ch\xFAng ta l\xE0m.", "\uC6B0\uB9AC\uAC00 \uD558\uB294 \uC77C\uC744 \uB9D0\uD574\uC694."), words: ["Let\u2019s", "clean", "the park."] },
          { t: "say", s: "Let\u2019s keep the park clean." }
        ],
        junior: [
          {
            t: "sort",
            q: "Sort the trash into three bins.",
            h: h("Ph\xE2n lo\u1EA1i r\xE1c v\xE0o ba th\xF9ng.", "\uC4F0\uB808\uAE30\uB97C \uC138 \uD1B5\uC5D0 \uB098\uB220 \uB2F4\uC544\uC694."),
            bins: [{ id: "paper", l: "Paper", e: "\u{1F4C4}", vi: "Gi\u1EA5y", ko: "\uC885\uC774" }, { id: "cans", l: "Plastic & cans", e: "\u{1F96B}", vi: "Nh\u1EF1a & lon", ko: "\uD50C\uB77C\uC2A4\uD2F1\xB7\uCE94" }, { id: "food", l: "Food", e: "\u{1F37D}\uFE0F", vi: "Th\u1EE9c \u0103n th\u1EEBa", ko: "\uC74C\uC2DD\uBB3C" }],
            items: [{ e: "\u{1F4F0}", l: "newspaper", bin: "paper" }, { e: "\u{1F96B}", l: "can", bin: "cans" }, { e: "\u{1F34C}", l: "banana peel", bin: "food" }, { e: "\u{1F4E6}", l: "box", bin: "paper" }, { e: "\u{1F964}", l: "plastic cup", bin: "cans" }, { e: "\u{1F34E}", l: "apple core", bin: "food" }]
          },
          {
            t: "choice",
            who: ["sofia"],
            story: s3("Sofia forgot her trash after her picnic. What can you say?", "Sofia qu\xEAn d\u1ECDn r\xE1c sau bu\u1ED5i d\xE3 ngo\u1EA1i. B\u1EA1n c\xF3 th\u1EC3 n\xF3i g\xEC?", "\uC18C\uD53C\uC544\uAC00 \uC18C\uD48D \uB4A4\uC5D0 \uC4F0\uB808\uAE30\uB97C \uAE5C\uBE61\uD588\uC5B4\uC694. \uBB50\uB77C\uACE0 \uB9D0\uD560\uAE4C\uC694?"),
            opts: [
              { l: "Sofia, let\u2019s clean up together.", good: true, out: s3("Sofia smiles. \u201CThank you! I forgot.\u201D You clean up in two minutes.", "Sofia m\u1EC9m c\u01B0\u1EDDi: \u201CC\u1EA3m \u01A1n b\u1EA1n! M\xECnh qu\xEAn m\u1EA5t.\u201D Hai b\u1EA1n d\u1ECDn xong ch\u1EC9 trong hai ph\xFAt.", "\uC18C\uD53C\uC544\uAC00 \uC6C3\uC5B4\uC694. \u201C\uACE0\uB9C8\uC6CC! \uAE5C\uBE61\uD588\uC5B4.\u201D \uB458\uC774\uC11C 2\uBD84 \uB9CC\uC5D0 \uB2E4 \uCE58\uC6E0\uC5B4\uC694.") },
              { l: "Leave it. It is not my trash.", good: false, out: s3("The trash stays in the park. Birds and dogs could eat it and get sick. Let\u2019s try another idea.", "R\xE1c v\u1EABn n\u1EB1m trong c\xF4ng vi\xEAn. Chim v\xE0 ch\xF3 c\xF3 th\u1EC3 \u0103n ph\u1EA3i r\u1ED3i b\u1ECB \u1ED1m. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC4F0\uB808\uAE30\uAC00 \uACF5\uC6D0\uC5D0 \uADF8\uB300\uB85C \uB0A8\uC544\uC694. \uC0C8\uB098 \uAC15\uC544\uC9C0\uAC00 \uBA39\uACE0 \uC544\uD50C \uC218 \uC788\uC5B4\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "You are so messy!", good: false, out: s3("Sofia feels hurt, and the trash is still there. Kind words work better. Let\u2019s try another idea.", "Sofia th\u1EA5y bu\u1ED3n, m\xE0 r\xE1c v\u1EABn c\xF2n \u0111\xF3. L\u1EDDi n\xF3i nh\u1EB9 nh\xE0ng s\u1EBD hi\u1EC7u qu\u1EA3 h\u01A1n. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC18C\uD53C\uC544\uB294 \uB9C8\uC74C\uC774 \uC0C1\uD558\uACE0 \uC4F0\uB808\uAE30\uB294 \uADF8\uB300\uB85C\uC608\uC694. \uB2E4\uC815\uD55C \uB9D0\uC774 \uB354 \uC88B\uC544\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") }
            ]
          },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["We", "keep", "the", "park", "clean."] },
          { t: "pick", q: "Why do we sort trash?", h: h("V\xEC sao ch\xFAng ta ph\xE2n lo\u1EA1i r\xE1c?", "\uC65C \uC4F0\uB808\uAE30\uB97C \uBD84\uB9AC\uD560\uAE4C\uC694?"), opts: ["So paper and cans can be used again.", "So the bins look pretty.", "So we have more trash."], a: "So paper and cans can be used again." },
          { t: "say", s: "Let\u2019s keep the park clean." }
        ]
      }
    },
    {
      id: "m-toy",
      building: "toyshop",
      pillar: "sel",
      age: "4\u201310",
      needs: 3,
      skills: ["kindness"],
      who: ["leo", "amara"],
      title: s3("Sharing at the Toy Shop", "Chia s\u1EBB \u1EDF c\u1EEDa h\xE0ng \u0111\u1ED3 ch\u01A1i", "\uC7A5\uB09C\uAC10 \uAC00\uAC8C\uC5D0\uC11C \uB098\uB204\uAE30"),
      objective: s3("Practice taking turns and sharing with friends.", "Luy\u1EC7n c\xE1ch ch\u01A1i l\u1EA7n l\u01B0\u1EE3t v\xE0 chia s\u1EBB v\u1EDBi b\u1EA1n.", "\uCC28\uB840\uB97C \uC9C0\uD0A4\uACE0 \uCE5C\uAD6C\uC640 \uB098\uB204\uB294 \uBC95\uC744 \uC5F0\uC2B5\uD574\uC694."),
      scenario: s3("Leo and Amara both want to play with the same toy truck.", "Leo v\xE0 Amara \u0111\u1EC1u mu\u1ED1n ch\u01A1i c\xF9ng m\u1ED9t chi\u1EBFc xe t\u1EA3i \u0111\u1ED3 ch\u01A1i.", "\uB808\uC624\uC640 \uC544\uB9C8\uB77C\uAC00 \uAC19\uC740 \uC7A5\uB09C\uAC10 \uD2B8\uB7ED\uC744 \uAC00\uC9C0\uACE0 \uB180\uACE0 \uC2F6\uC5B4 \uD574\uC694."),
      lesson: s3("When we share and take turns, everyone gets a chance to play.", "Khi ch\xFAng ta chia s\u1EBB v\xE0 ch\u01A1i l\u1EA7n l\u01B0\u1EE3t, ai c\u0169ng c\xF3 c\u01A1 h\u1ED9i \u0111\u01B0\u1EE3c ch\u01A1i.", "\uB098\uB204\uACE0 \uCC28\uB840\uB97C \uC9C0\uD0A4\uBA74 \uBAA8\uB450\uAC00 \uB180 \uC218 \uC788\uC5B4\uC694."),
      feedback: s3("Lovely! You helped two friends play fairly.", "Hay l\u1EAFm! B\u1EA1n \u0111\xE3 gi\xFAp hai ng\u01B0\u1EDDi b\u1EA1n ch\u01A1i c\xF4ng b\u1EB1ng.", "\uBA4B\uC838\uC694! \uB450 \uCE5C\uAD6C\uAC00 \uC0AC\uC774\uC88B\uAC8C \uB180\uB3C4\uB85D \uB3C4\uC654\uC5B4\uC694."),
      vocab: [v("toy", "\u{1F9F8}", "\u0111\u1ED3 ch\u01A1i", "\uC7A5\uB09C\uAC10"), v("share", "\u{1F91D}", "chia s\u1EBB", "\uB098\uB204\uB2E4"), v("turn", "\u{1F504}", "l\u01B0\u1EE3t", "\uCC28\uB840"), v("together", "\u{1F46B}", "c\xF9ng nhau", "\uD568\uAED8"), v("friend", "\u{1F60A}", "b\u1EA1n", "\uCE5C\uAD6C")],
      target: "Let\u2019s take turns.",
      targetHelp: h("Ch\xFAng m\xECnh ch\u01A1i l\u1EA7n l\u01B0\u1EE3t nh\xE9.", "\uC6B0\uB9AC \uCC28\uB840\uB300\uB85C \uD558\uC790."),
      steps: {
        little: [
          {
            t: "choice",
            who: ["leo", "amara"],
            story: s3("Leo and Amara want the same truck. What can they say?", "Leo v\xE0 Amara mu\u1ED1n c\xF9ng m\u1ED9t chi\u1EBFc xe t\u1EA3i. C\xE1c b\u1EA1n c\xF3 th\u1EC3 n\xF3i g\xEC?", "\uB808\uC624\uC640 \uC544\uB9C8\uB77C\uAC00 \uAC19\uC740 \uD2B8\uB7ED\uC744 \uC6D0\uD574\uC694. \uBB50\uB77C\uACE0 \uB9D0\uD560 \uC218 \uC788\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Let\u2019s take turns.", good: true, out: s3("Leo plays first. Then Amara plays. Both friends are happy!", "Leo ch\u01A1i tr\u01B0\u1EDBc. Sau \u0111\xF3 \u0111\u1EBFn Amara. C\u1EA3 hai b\u1EA1n \u0111\u1EC1u vui!", "\uB808\uC624\uAC00 \uBA3C\uC800 \uB180\uACE0, \uB2E4\uC74C\uC5D0 \uC544\uB9C8\uB77C\uAC00 \uB180\uC544\uC694. \uB458 \uB2E4 \uAE30\uBED0\uC694!") },
              { l: "You can\u2019t play.", good: false, out: s3("Amara feels sad and left out. Let\u2019s try another idea.", "Amara th\u1EA5y bu\u1ED3n v\xEC b\u1ECB b\u1ECF ra ngo\xE0i. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC544\uB9C8\uB77C\uB294 \uC2AC\uD504\uACE0 \uD63C\uC790 \uB0A8\uACA8\uC9C4 \uAE30\uBD84\uC774\uC5D0\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Let\u2019s play together.", good: true, out: s3("They build a road and play together. What fun!", "Hai b\u1EA1n x\xE2y m\u1ED9t con \u0111\u01B0\u1EDDng v\xE0 ch\u01A1i c\xF9ng nhau. Vui qu\xE1!", "\uB458\uC774 \uAE38\uC744 \uB9CC\uB4E4\uACE0 \uD568\uAED8 \uB180\uC544\uC694. \uC815\uB9D0 \uC7AC\uBBF8\uC788\uC5B4\uC694!") }
            ]
          },
          { t: "pick", q: "Amara can play too. How does she feel?", h: h("Amara c\u0169ng \u0111\u01B0\u1EE3c ch\u01A1i. B\u1EA1n \u1EA5y c\u1EA3m th\u1EA5y th\u1EBF n\xE0o?", "\uC544\uB9C8\uB77C\uB3C4 \uB180 \uC218 \uC788\uC5B4\uC694. \uAE30\uBD84\uC774 \uC5B4\uB5A8\uAE4C\uC694?"), opts: [["\u{1F60A}", "happy"], ["\u{1F622}", "sad"]], a: "happy" },
          { t: "order", q: "Say it kindly.", h: h("H\xE3y n\xF3i th\u1EADt nh\u1EB9 nh\xE0ng.", "\uB2E4\uC815\uD558\uAC8C \uB9D0\uD574\uC694."), words: ["Let\u2019s", "take", "turns."] },
          { t: "say", s: "Let\u2019s take turns." }
        ],
        junior: [
          {
            t: "choice",
            who: ["leo", "amara"],
            story: s3("Leo and Amara both want to play with the same toy truck. What can they say?", "Leo v\xE0 Amara \u0111\u1EC1u mu\u1ED1n ch\u01A1i c\xF9ng m\u1ED9t chi\u1EBFc xe t\u1EA3i \u0111\u1ED3 ch\u01A1i. C\xE1c b\u1EA1n c\xF3 th\u1EC3 n\xF3i g\xEC?", "\uB808\uC624\uC640 \uC544\uB9C8\uB77C\uAC00 \uAC19\uC740 \uC7A5\uB09C\uAC10 \uD2B8\uB7ED\uC744 \uAC00\uC9C0\uACE0 \uB180\uACE0 \uC2F6\uC5B4 \uD574\uC694. \uBB50\uB77C\uACE0 \uB9D0\uD560 \uC218 \uC788\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Let\u2019s take turns.", good: true, out: s3("Leo plays first. Then Amara plays. Both friends are happy!", "Leo ch\u01A1i tr\u01B0\u1EDBc. Sau \u0111\xF3 \u0111\u1EBFn Amara. C\u1EA3 hai b\u1EA1n \u0111\u1EC1u vui!", "\uB808\uC624\uAC00 \uBA3C\uC800 \uB180\uACE0, \uB2E4\uC74C\uC5D0 \uC544\uB9C8\uB77C\uAC00 \uB180\uC544\uC694. \uB458 \uB2E4 \uAE30\uBED0\uC694!") },
              { l: "You can\u2019t play.", good: false, out: s3("Amara feels sad and left out. Let\u2019s try another idea.", "Amara th\u1EA5y bu\u1ED3n v\xEC b\u1ECB b\u1ECF ra ngo\xE0i. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC544\uB9C8\uB77C\uB294 \uC2AC\uD504\uACE0 \uD63C\uC790 \uB0A8\uACA8\uC9C4 \uAE30\uBD84\uC774\uC5D0\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Let\u2019s play together.", good: true, out: s3("They build a road and play together. What fun!", "Hai b\u1EA1n x\xE2y m\u1ED9t con \u0111\u01B0\u1EDDng v\xE0 ch\u01A1i c\xF9ng nhau. Vui qu\xE1!", "\uB458\uC774 \uAE38\uC744 \uB9CC\uB4E4\uACE0 \uD568\uAED8 \uB180\uC544\uC694. \uC815\uB9D0 \uC7AC\uBBF8\uC788\uC5B4\uC694!") }
            ]
          },
          {
            t: "choice",
            who: ["leo"],
            story: s3("Amara is playing with the truck. Leo wants a turn. What can Leo do?", "Amara \u0111ang ch\u01A1i xe t\u1EA3i. Leo c\u0169ng mu\u1ED1n ch\u01A1i. Leo c\xF3 th\u1EC3 l\xE0m g\xEC?", "\uC544\uB9C8\uB77C\uAC00 \uD2B8\uB7ED\uC744 \uAC00\uC9C0\uACE0 \uB180\uACE0 \uC788\uC5B4\uC694. \uB808\uC624\uB3C4 \uB180\uACE0 \uC2F6\uC5B4\uC694. \uB808\uC624\uB294 \uC5B4\uB5BB\uAC8C \uD558\uBA74 \uC88B\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Ask, \u201CCan I have a turn when you finish?\u201D", good: true, out: s3("Amara says, \u201CSure! Two more minutes.\u201D Asking kindly works.", "Amara n\xF3i: \u201C\u0110\u01B0\u1EE3c ch\u1EE9! Th\xEAm hai ph\xFAt n\u1EEFa nh\xE9.\u201D H\u1ECFi nh\u1EB9 nh\xE0ng th\u1EADt hi\u1EC7u qu\u1EA3.", "\uC544\uB9C8\uB77C\uAC00 \uB9D0\uD574\uC694. \u201C\uADF8\uB7FC! 2\uBD84\uB9CC \uB354.\u201D \uB2E4\uC815\uD558\uAC8C \uBB3C\uC5B4\uBCF4\uB2C8 \uD1B5\uD588\uC5B4\uC694.") },
              { l: "Grab the truck.", good: false, out: s3("The truck falls and both friends are upset. Let\u2019s try another idea.", "Chi\u1EBFc xe r\u01A1i xu\u1ED1ng v\xE0 c\u1EA3 hai b\u1EA1n \u0111\u1EC1u bu\u1ED3n. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uD2B8\uB7ED\uC774 \uB5A8\uC5B4\uC9C0\uACE0 \uB450 \uCE5C\uAD6C \uBAA8\uB450 \uC18D\uC0C1\uD574\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Wait and play with blocks first.", good: true, out: s3("Leo builds a tower while he waits. Being patient helps.", "Leo x\u1EBFp m\u1ED9t t\xF2a th\xE1p trong l\xFAc ch\u1EDD. Ki\xEAn nh\u1EABn th\u1EADt c\xF3 \xEDch.", "\uB808\uC624\uB294 \uAE30\uB2E4\uB9AC\uB294 \uB3D9\uC548 \uD0D1\uC744 \uC313\uC544\uC694. \uCC38\uACE0 \uAE30\uB2E4\uB9AC\uBA74 \uB3C4\uC6C0\uC774 \uB3FC\uC694.") }
            ]
          },
          { t: "order", q: "Ask for a turn.", h: h("H\xE3y xin \u0111\u1EBFn l\u01B0\u1EE3t.", "\uCC28\uB840\uB97C \uBD80\uD0C1\uD574\uC694."), words: ["Can", "I", "have", "a", "turn,", "please?"] },
          { t: "pick", q: "Why does taking turns help?", h: h("V\xEC sao ch\u01A1i l\u1EA7n l\u01B0\u1EE3t l\u1EA1i t\u1ED1t?", "\uCC28\uB840\uB97C \uC9C0\uD0A4\uBA74 \uC65C \uC88B\uC744\uAE4C\uC694?"), opts: ["Everyone gets a chance to play.", "One person keeps the toy.", "Nobody plays."], a: "Everyone gets a chance to play." },
          { t: "say", s: "Let\u2019s take turns. You can go first." }
        ]
      }
    },
    {
      id: "m-center",
      building: "center",
      pillar: "sel",
      age: "4\u201310",
      needs: 3,
      skills: ["empathy"],
      who: ["sofia"],
      title: s3("A Friend Feels Sad", "Khi b\u1EA1n m\xECnh bu\u1ED3n", "\uCE5C\uAD6C\uAC00 \uC2AC\uD50C \uB54C"),
      objective: s3("Name feelings and choose a kind, supportive answer.", "G\u1ECDi t\xEAn c\u1EA3m x\xFAc v\xE0 ch\u1ECDn l\u1EDDi n\xF3i \xE2n c\u1EA7n.", "\uAC10\uC815\uC758 \uC774\uB984\uC744 \uB9D0\uD558\uACE0 \uB2E4\uC815\uD558\uAC8C \uC704\uB85C\uD558\uB294 \uB9D0\uC744 \uACE8\uB77C\uC694."),
      scenario: s3("Sofia\u2019s best friend moved to a new city. Sofia feels sad.", "B\u1EA1n th\xE2n c\u1EE7a Sofia \u0111\xE3 chuy\u1EC3n \u0111\u1EBFn m\u1ED9t th\xE0nh ph\u1ED1 kh\xE1c. Sofia c\u1EA3m th\u1EA5y bu\u1ED3n.", "\uC18C\uD53C\uC544\uC758 \uAC00\uC7A5 \uCE5C\uD55C \uCE5C\uAD6C\uAC00 \uB2E4\uB978 \uB3C4\uC2DC\uB85C \uC774\uC0AC \uAC14\uC5B4\uC694. \uC18C\uD53C\uC544\uB294 \uC2AC\uD37C\uC694."),
      lesson: s3("All feelings are okay. Kind words help a friend feel less alone.", "M\u1ECDi c\u1EA3m x\xFAc \u0111\u1EC1u b\xECnh th\u01B0\u1EDDng. L\u1EDDi n\xF3i \xE2n c\u1EA7n gi\xFAp b\u1EA1n b\u1EDBt c\xF4 \u0111\u01A1n.", "\uC5B4\uB5A4 \uAC10\uC815\uC774\uB4E0 \uAD1C\uCC2E\uC544\uC694. \uB2E4\uC815\uD55C \uB9D0\uC740 \uCE5C\uAD6C\uAC00 \uB35C \uC678\uB86D\uAC8C \uD574 \uC918\uC694."),
      feedback: s3("That was kind. You helped a friend feel better.", "B\u1EA1n th\u1EADt t\u1EED t\u1EBF. B\u1EA1n \u0111\xE3 gi\xFAp m\u1ED9t ng\u01B0\u1EDDi b\u1EA1n th\u1EA5y kh\xE1 h\u01A1n.", "\uCC38 \uB2E4\uC815\uD588\uC5B4\uC694. \uCE5C\uAD6C\uC758 \uB9C8\uC74C\uC774 \uB098\uC544\uC9C0\uB3C4\uB85D \uB3C4\uC654\uC5B4\uC694."),
      vocab: [v("happy", "\u{1F60A}", "vui", "\uAE30\uC05C"), v("sad", "\u{1F622}", "bu\u1ED3n", "\uC2AC\uD508"), v("angry", "\u{1F620}", "t\u1EE9c gi\u1EADn", "\uD654\uB09C"), v("scared", "\u{1F628}", "s\u1EE3", "\uBB34\uC11C\uC6B4"), v("hug", "\u{1F917}", "c\xE1i \xF4m", "\uD3EC\uC639")],
      target: "I am here for you.",
      targetHelp: h("M\xECnh \u1EDF \u0111\xE2y v\u1EDBi b\u1EA1n.", "\uB0B4\uAC00 \uACC1\uC5D0 \uC788\uC744\uAC8C."),
      steps: {
        little: [
          { t: "pick", q: "Sofia\u2019s friend moved away. How does Sofia feel?", h: h("B\u1EA1n c\u1EE7a Sofia chuy\u1EC3n \u0111i r\u1ED3i. Sofia c\u1EA3m th\u1EA5y th\u1EBF n\xE0o?", "\uC18C\uD53C\uC544\uC758 \uCE5C\uAD6C\uAC00 \uC774\uC0AC \uAC14\uC5B4\uC694. \uC18C\uD53C\uC544\uC758 \uAE30\uBD84\uC740 \uC5B4\uB5A8\uAE4C\uC694?"), opts: ["sad", "happy", "angry"], a: "sad" },
          {
            t: "choice",
            who: ["sofia"],
            story: s3("What can you do for Sofia?", "B\u1EA1n c\xF3 th\u1EC3 l\xE0m g\xEC cho Sofia?", "\uC18C\uD53C\uC544\uB97C \uC704\uD574 \uBB34\uC5C7\uC744 \uD560 \uC218 \uC788\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Sit with her and say, \u201CI am here.\u201D", good: true, out: s3("Sofia feels a little better. A friend is near.", "Sofia th\u1EA5y kh\xE1 h\u01A1n m\u1ED9t ch\xFAt. C\xF3 b\u1EA1n \u1EDF b\xEAn c\u1EA1nh.", "\uC18C\uD53C\uC544\uC758 \uAE30\uBD84\uC774 \uC870\uAE08 \uB098\uC544\uC84C\uC5B4\uC694. \uACC1\uC5D0 \uCE5C\uAD6C\uAC00 \uC788\uC73C\uB2C8\uAE4C\uC694.") },
              { l: "Laugh at her.", good: false, out: s3("Sofia feels worse. Let\u2019s try another idea.", "Sofia th\u1EA5y bu\u1ED3n h\u01A1n. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC18C\uD53C\uC544\uB294 \uB354 \uC18D\uC0C1\uD574\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Draw a picture with her for her friend.", good: true, out: s3("Sofia smiles. She can send the picture to her friend!", "Sofia m\u1EC9m c\u01B0\u1EDDi. B\u1EA1n \u1EA5y c\xF3 th\u1EC3 g\u1EEDi b\u1EE9c tranh cho b\u1EA1n m\xECnh!", "\uC18C\uD53C\uC544\uAC00 \uC6C3\uC5B4\uC694. \uADF8\uB9BC\uC744 \uCE5C\uAD6C\uC5D0\uAC8C \uBCF4\uB0BC \uC218 \uC788\uC5B4\uC694!") }
            ]
          },
          { t: "pick", q: "Tap the happy face.", h: h("H\xE3y ch\u1EA1m v\xE0o khu\xF4n m\u1EB7t vui.", "\uAE30\uC05C \uC5BC\uAD74\uC744 \uB20C\uB7EC\uC694."), opts: ["happy", "scared", "sad"], a: "happy" },
          { t: "say", s: "I am here for you." }
        ],
        junior: [
          { t: "pick", passage: "Sofia\u2019s best friend moved to a new city last week. Today Sofia sits alone. She does not want to play.", q: "How does Sofia feel?", h: h("Sofia c\u1EA3m th\u1EA5y th\u1EBF n\xE0o?", "\uC18C\uD53C\uC544\uC758 \uAE30\uBD84\uC740 \uC5B4\uB5A4\uAC00\uC694?"), opts: ["sad", "happy", "angry"], a: "sad" },
          { t: "pick", passage: "Sofia\u2019s best friend moved to a new city last week. Today Sofia sits alone. She does not want to play.", q: "Why does Sofia feel sad?", h: h("V\xEC sao Sofia bu\u1ED3n?", "\uC18C\uD53C\uC544\uB294 \uC65C \uC2AC\uD50C\uAE4C\uC694?"), opts: ["She misses her friend.", "She lost her toy.", "She is hungry."], a: "She misses her friend." },
          {
            t: "choice",
            who: ["sofia"],
            story: s3("What can you say to Sofia?", "B\u1EA1n c\xF3 th\u1EC3 n\xF3i g\xEC v\u1EDBi Sofia?", "\uC18C\uD53C\uC544\uC5D0\uAC8C \uBB50\uB77C\uACE0 \uB9D0\uD560\uAE4C\uC694?"),
            opts: [
              { l: "I am sorry you miss your friend. Do you want to talk?", good: true, out: s3("Sofia nods. Talking about feelings can help.", "Sofia g\u1EADt \u0111\u1EA7u. N\xF3i ra c\u1EA3m x\xFAc c\xF3 th\u1EC3 gi\xFAp m\xECnh nh\u1EB9 l\xF2ng h\u01A1n.", "\uC18C\uD53C\uC544\uAC00 \uACE0\uAC1C\uB97C \uB044\uB355\uC5EC\uC694. \uAC10\uC815\uC744 \uC774\uC57C\uAE30\uD558\uBA74 \uB3C4\uC6C0\uC774 \uB3FC\uC694.") },
              { l: "Stop being sad.", good: false, out: s3("Sofia still feels sad, and now she feels alone too. Feelings need time. Let\u2019s try another idea.", "Sofia v\u1EABn bu\u1ED3n, v\xE0 gi\u1EDD c\xF2n th\u1EA5y c\xF4 \u0111\u01A1n n\u1EEFa. C\u1EA3m x\xFAc c\u1EA7n th\u1EDDi gian. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC18C\uD53C\uC544\uB294 \uC5EC\uC804\uD788 \uC2AC\uD504\uACE0 \uC774\uC81C\uB294 \uC678\uB86D\uAE30\uAE4C\uC9C0 \uD574\uC694. \uAC10\uC815\uC5D0\uB294 \uC2DC\uAC04\uC774 \uD544\uC694\uD574\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Would you like to write a letter to her together?", good: true, out: s3("Sofia loves the idea. Friends can stay close, even far away.", "Sofia r\u1EA5t th\xEDch \xFD t\u01B0\u1EDFng n\xE0y. B\u1EA1n b\xE8 v\u1EABn c\xF3 th\u1EC3 g\u1EA7n g\u0169i d\xF9 \u1EDF xa.", "\uC18C\uD53C\uC544\uAC00 \uC815\uB9D0 \uC88B\uC544\uD574\uC694. \uBA40\uB9AC \uC788\uC5B4\uB3C4 \uCE5C\uAD6C\uC640 \uAC00\uAE4C\uC774 \uC9C0\uB0BC \uC218 \uC788\uC5B4\uC694.") }
            ]
          },
          { t: "order", q: "Build the kind sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u n\xF3i \xE2n c\u1EA7n.", "\uB2E4\uC815\uD55C \uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["I", "am", "here", "for", "you."] },
          { t: "say", s: "It is okay to feel sad. I am here for you." }
        ]
      }
    },
    {
      id: "m-hospital",
      building: "hospital",
      pillar: "life",
      age: "4\u201310",
      needs: 3,
      skills: ["courage"],
      who: ["amara"],
      title: s3("Helpers at the Hospital", "Nh\u1EEFng ng\u01B0\u1EDDi gi\xFAp \u0111\u1EE1 \u1EDF b\u1EC7nh vi\u1EC7n", "\uBCD1\uC6D0\uC758 \uB3C4\uC6B0\uBBF8\uB4E4"),
      objective: s3("Learn the word \u201Chospital\u201D and who helps us when we are sick.", "H\u1ECDc t\u1EEB \u201Chospital\u201D v\xE0 bi\u1EBFt ai gi\xFAp ch\xFAng ta khi b\u1ECB \u1ED1m.", "\u201Chospital\u201D\uC774\uB77C\uB294 \uB2E8\uC5B4\uC640 \uC544\uD50C \uB54C \uB3C4\uC640\uC8FC\uB294 \uC0AC\uB78C\uB4E4\uC744 \uBC30\uC6CC\uC694."),
      scenario: s3("Amara has a cold. Where can she go? The city needs a hospital!", "Amara b\u1ECB c\u1EA3m. B\u1EA1n \u1EA5y c\xF3 th\u1EC3 \u0111i \u0111\xE2u? Th\xE0nh ph\u1ED1 c\u1EA7n m\u1ED9t b\u1EC7nh vi\u1EC7n!", "\uC544\uB9C8\uB77C\uAC00 \uAC10\uAE30\uC5D0 \uAC78\uB838\uC5B4\uC694. \uC5B4\uB514\uB85C \uAC00\uC57C \uD560\uAE4C\uC694? \uB3C4\uC2DC\uC5D0 \uBCD1\uC6D0\uC774 \uD544\uC694\uD574\uC694!"),
      lesson: s3("Doctors and nurses are community helpers. It is brave to ask for help when we feel sick.", "B\xE1c s\u0129 v\xE0 y t\xE1 l\xE0 nh\u1EEFng ng\u01B0\u1EDDi gi\xFAp \u0111\u1EE1 c\u1ED9ng \u0111\u1ED3ng. Bi\u1EBFt nh\u1EDD gi\xFAp \u0111\u1EE1 khi b\u1ECB \u1ED1m l\xE0 d\u0169ng c\u1EA3m.", "\uC758\uC0AC\uC640 \uAC04\uD638\uC0AC\uB294 \uB9C8\uC744\uC758 \uB3C4\uC6B0\uBBF8\uC608\uC694. \uC544\uD50C \uB54C \uB3C4\uC6C0\uC744 \uCCAD\uD558\uB294 \uAC83\uC740 \uC6A9\uAE30 \uC788\uB294 \uC77C\uC774\uC5D0\uC694."),
      feedback: s3("Well done! Now the city can care for sick people.", "L\xE0m t\u1ED1t l\u1EAFm! Gi\u1EDD th\xE0nh ph\u1ED1 \u0111\xE3 c\xF3 n\u01A1i ch\u0103m s\xF3c ng\u01B0\u1EDDi \u1ED1m.", "\uC798\uD588\uC5B4\uC694! \uC774\uC81C \uB3C4\uC2DC\uAC00 \uC544\uD508 \uC0AC\uB78C\uB4E4\uC744 \uB3CC\uBCFC \uC218 \uC788\uC5B4\uC694."),
      vocab: [v("hospital", "\u{1F3E5}", "b\u1EC7nh vi\u1EC7n", "\uBCD1\uC6D0"), v("doctor", "\u{1F9D1}\u200D\u2695\uFE0F", "b\xE1c s\u0129", "\uC758\uC0AC"), v("sick", "\u{1F912}", "\u1ED1m", "\uC544\uD508"), v("medicine", "\u{1F48A}", "thu\u1ED1c", "\uC57D"), v("ambulance", "\u{1F691}", "xe c\u1EE9u th\u01B0\u01A1ng", "\uAD6C\uAE09\uCC28")],
      target: "The doctor helps sick people.",
      targetHelp: h("B\xE1c s\u0129 gi\xFAp \u0111\u1EE1 ng\u01B0\u1EDDi \u1ED1m.", "\uC758\uC0AC\uB294 \uC544\uD508 \uC0AC\uB78C\uB4E4\uC744 \uB3C4\uC640\uC694."),
      steps: {
        little: [
          { t: "pick", q: "Amara is sick. Where does she go? Tap the hospital.", h: h("Amara b\u1ECB \u1ED1m. B\u1EA1n \u1EA5y \u0111i \u0111\xE2u? H\xE3y ch\u1EA1m v\xE0o b\u1EC7nh vi\u1EC7n.", "\uC544\uB9C8\uB77C\uAC00 \uC544\uD30C\uC694. \uC5B4\uB514\uB85C \uAC08\uAE4C\uC694? \uBCD1\uC6D0\uC744 \uB20C\uB7EC\uC694."), opts: ["hospital", ["\u{1F3EB}", "school"], ["\u{1F3EA}", "shop"]], a: "hospital" },
          { t: "pick", q: "Who helps sick people? Tap the doctor.", h: h("Ai gi\xFAp ng\u01B0\u1EDDi \u1ED1m? H\xE3y ch\u1EA1m v\xE0o b\xE1c s\u0129.", "\uB204\uAC00 \uC544\uD508 \uC0AC\uB78C\uC744 \uB3C4\uC640\uC904\uAE4C\uC694? \uC758\uC0AC\uB97C \uB20C\uB7EC\uC694."), opts: ["doctor", ["\u{1F9D1}\u200D\u{1F373}", "cook"], ["\u{1F9D1}\u200D\u{1F692}", "firefighter"]], a: "doctor" },
          { t: "order", q: "Spell the word.", h: h("Gh\xE9p ch\u1EEF th\xE0nh t\u1EEB.", "\uAE00\uC790\uB97C \uB9DE\uCDB0 \uB2E8\uC5B4\uB97C \uB9CC\uB4E4\uC5B4\uC694."), letters: true, pic: "\u{1F91D}", words: ["h", "e", "l", "p"] },
          { t: "say", s: "The doctor helps people." }
        ],
        junior: [
          { t: "pick", q: "Amara has a cold and feels sick. Who can help her?", h: h("Amara b\u1ECB c\u1EA3m v\xE0 th\u1EA5y m\u1EC7t. Ai c\xF3 th\u1EC3 gi\xFAp b\u1EA1n \u1EA5y?", "\uC544\uB9C8\uB77C\uAC00 \uAC10\uAE30\uC5D0 \uAC78\uB824 \uC544\uD30C\uC694. \uB204\uAC00 \uB3C4\uC640\uC904 \uC218 \uC788\uC744\uAE4C\uC694?"), opts: ["doctor", ["\u{1F9D1}\u200D\u{1F373}", "cook"], ["\u{1F9D1}\u200D\u{1F692}", "firefighter"]], a: "doctor" },
          { t: "type", pic: "\u{1F9D1}\u200D\u2695\uFE0F", pre: "A", post: "helps sick people.", a: "doctor" },
          { t: "pick", passage: "The hospital is open day and night. Doctors and nurses work there. An ambulance brings people who need help fast.", q: "When is the hospital open?", h: h("B\u1EC7nh vi\u1EC7n m\u1EDF c\u1EEDa khi n\xE0o?", "\uBCD1\uC6D0\uC740 \uC5B8\uC81C \uBB38\uC744 \uC5EC\uB098\uC694?"), opts: ["Day and night", "Only in the morning", "Only on Sunday"], a: "Day and night" },
          {
            t: "choice",
            who: ["amara"],
            story: s3("Amara is a little scared of the doctor. What can you say?", "Amara h\u01A1i s\u1EE3 g\u1EB7p b\xE1c s\u0129. B\u1EA1n c\xF3 th\u1EC3 n\xF3i g\xEC?", "\uC544\uB9C8\uB77C\uB294 \uC758\uC0AC \uC120\uC0DD\uB2D8\uC774 \uC870\uAE08 \uBB34\uC11C\uC6CC\uC694. \uBB50\uB77C\uACE0 \uB9D0\uD560\uAE4C\uC694?"),
            opts: [
              { l: "The doctor is here to help you. I will stay with you.", good: true, out: s3("Amara takes a deep breath. She feels braver with a friend.", "Amara h\xEDt m\u1ED9t h\u01A1i th\u1EADt s\xE2u. C\xF3 b\u1EA1n b\xEAn c\u1EA1nh, b\u1EA1n \u1EA5y th\u1EA5y d\u0169ng c\u1EA3m h\u01A1n.", "\uC544\uB9C8\uB77C\uAC00 \uC228\uC744 \uD06C\uAC8C \uC26C\uC5B4\uC694. \uCE5C\uAD6C\uAC00 \uC788\uC5B4\uC11C \uB354 \uC6A9\uAC10\uD574\uC84C\uC5B4\uC694.") },
              { l: "Don\u2019t be a baby.", good: false, out: s3("Amara feels worse. Being scared is okay. Let\u2019s try another idea.", "Amara th\u1EA5y t\u1EC7 h\u01A1n. S\u1EE3 l\xE0 chuy\u1EC7n b\xECnh th\u01B0\u1EDDng. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC544\uB9C8\uB77C\uB294 \uB354 \uC18D\uC0C1\uD574\uC694. \uBB34\uC11C\uC6CC\uD574\uB3C4 \uAD1C\uCC2E\uC544\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "It is okay to feel scared. You are brave.", good: true, out: s3("Amara smiles a little. Kind words give her courage.", "Amara kh\u1EBD m\u1EC9m c\u01B0\u1EDDi. L\u1EDDi n\xF3i \xE2n c\u1EA7n ti\u1EBFp th\xEAm can \u0111\u1EA3m cho b\u1EA1n \u1EA5y.", "\uC544\uB9C8\uB77C\uAC00 \uC0B4\uC9DD \uC6C3\uC5B4\uC694. \uB2E4\uC815\uD55C \uB9D0\uC774 \uC6A9\uAE30\uB97C \uC918\uC694.") }
            ]
          },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["The", "doctor", "helps", "sick", "people."] },
          { t: "say", s: "The doctor helps sick people." }
        ]
      }
    },
    {
      id: "m-police",
      building: "police",
      pillar: "life",
      age: "5\u201310",
      needs: 5,
      skills: ["safety"],
      who: ["joon"],
      title: s3("Stay Safe, Ask for Help", "Gi\u1EEF an to\xE0n, nh\u1EDD gi\xFAp \u0111\u1EE1", "\uC548\uC804\uD558\uAC8C, \uB3C4\uC6C0\uC744 \uCCAD\uD574\uC694"),
      objective: s3("Practice keeping private information private and going to a trusted grown-up.", "Luy\u1EC7n c\xE1ch gi\u1EEF k\xEDn th\xF4ng tin ri\xEAng v\xE0 t\xECm \u0111\u1EBFn ng\u01B0\u1EDDi l\u1EDBn \u0111\xE1ng tin c\u1EADy.", "\uAC1C\uC778 \uC815\uBCF4\uB97C \uC9C0\uD0A4\uACE0 \uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978\uC5D0\uAC8C \uAC00\uB294 \uBC95\uC744 \uC5F0\uC2B5\uD574\uC694."),
      scenario: s3("At the park, a grown-up Joon does not know asks, \u201CWhat is your name? Where do you live?\u201D", "\u1EDE c\xF4ng vi\xEAn, m\u1ED9t ng\u01B0\u1EDDi l\u1EDBn m\xE0 Joon kh\xF4ng quen h\u1ECFi: \u201CCh\xE1u t\xEAn g\xEC? Nh\xE0 ch\xE1u \u1EDF \u0111\xE2u?\u201D", "\uACF5\uC6D0\uC5D0\uC11C \uC900\uC774 \uBAA8\uB974\uB294 \uC5B4\uB978\uC774 \uBB3C\uC5B4\uC694. \u201C\uC774\uB984\uC774 \uBB50\uB2C8? \uC5B4\uB514 \uC0AC\uB2C8?\u201D"),
      lesson: s3("Most people are kind. It is still smart to keep your name, address, school and phone number private. When you feel unsure, go to a grown-up you trust.", "H\u1EA7u h\u1EBFt m\u1ECDi ng\u01B0\u1EDDi \u0111\u1EC1u t\u1ED1t b\u1EE5ng. Nh\u01B0ng gi\u1EEF k\xEDn t\xEAn, \u0111\u1ECBa ch\u1EC9, tr\u01B0\u1EDDng h\u1ECDc v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i v\u1EABn l\xE0 \u0111i\u1EC1u kh\xF4n ngoan. Khi th\u1EA5y kh\xF4ng ch\u1EAFc ch\u1EAFn, h\xE3y t\xECm \u0111\u1EBFn ng\u01B0\u1EDDi l\u1EDBn m\xE0 b\u1EA1n tin t\u01B0\u1EDFng.", "\uB300\uBD80\uBD84\uC758 \uC0AC\uB78C\uB4E4\uC740 \uCE5C\uC808\uD574\uC694. \uADF8\uB798\uB3C4 \uC774\uB984, \uC8FC\uC18C, \uD559\uAD50, \uC804\uD654\uBC88\uD638\uB294 \uC9C0\uD0A4\uB294 \uAC83\uC774 \uD604\uBA85\uD574\uC694. \uD655\uC2E4\uD558\uC9C0 \uC54A\uC744 \uB54C\uB294 \uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978\uC5D0\uAC8C \uAC00\uC694."),
      feedback: s3("Smart thinking! You know how to stay safe.", "Suy ngh\u0129 th\u1EADt th\xF4ng minh! B\u1EA1n \u0111\xE3 bi\u1EBFt c\xE1ch gi\u1EEF an to\xE0n.", "\uB611\uB611\uD574\uC694! \uC548\uC804\uC744 \uC9C0\uD0A4\uB294 \uBC95\uC744 \uC54C\uC558\uC5B4\uC694."),
      vocab: [v("safe", "\u2705", "an to\xE0n", "\uC548\uC804\uD55C"), v("help", "\u{1F64B}", "gi\xFAp \u0111\u1EE1", "\uB3C4\uC6C0"), v("stop", "\u270B", "d\u1EEBng l\u1EA1i", "\uBA48\uCDB0"), v("ask", "\u{1F4AC}", "h\u1ECFi", "\uBB3B\uB2E4"), v("private", "\u{1F512}", "ri\xEAng t\u01B0", "\uBE44\uBC00(\uAC1C\uC778\uC801\uC778)")],
      target: "I will ask a grown-up I trust.",
      targetHelp: h("M\xECnh s\u1EBD h\u1ECFi m\u1ED9t ng\u01B0\u1EDDi l\u1EDBn m\xE0 m\xECnh tin t\u01B0\u1EDFng.", "\uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978\uC5D0\uAC8C \uBB3C\uC5B4\uBCFC\uAC8C\uC694."),
      steps: {
        little: [
          {
            t: "choice",
            who: ["joon"],
            story: s3("A grown-up Joon does not know asks, \u201CWhere do you live?\u201D What can Joon do?", "M\u1ED9t ng\u01B0\u1EDDi l\u1EDBn m\xE0 Joon kh\xF4ng quen h\u1ECFi: \u201CNh\xE0 ch\xE1u \u1EDF \u0111\xE2u?\u201D Joon c\xF3 th\u1EC3 l\xE0m g\xEC?", "\uC900\uC774 \uBAA8\uB974\uB294 \uC5B4\uB978\uC774 \u201C\uC5B4\uB514 \uC0AC\uB2C8?\u201D \uD558\uACE0 \uBB3C\uC5B4\uC694. \uC900\uC740 \uC5B4\uB5BB\uAC8C \uD558\uBA74 \uC88B\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Go to a grown-up I trust.", good: true, out: s3("Joon walks to his dad. His dad can help.", "Joon \u0111i v\u1EC1 ph\xEDa b\u1ED1. B\u1ED1 c\xF3 th\u1EC3 gi\xFAp b\u1EA1n \u1EA5y.", "\uC900\uC740 \uC544\uBE60\uC5D0\uAC8C \uAC00\uC694. \uC544\uBE60\uAC00 \uB3C4\uC640\uC904 \uC218 \uC788\uC5B4\uC694.") },
              { l: "Tell them where I live.", good: false, out: s3("Our address is private. We share it only with people our family trusts. Let\u2019s try another idea.", "\u0110\u1ECBa ch\u1EC9 nh\xE0 l\xE0 th\xF4ng tin ri\xEAng. Ch\xFAng ta ch\u1EC9 n\xF3i v\u1EDBi nh\u1EEFng ng\u01B0\u1EDDi m\xE0 gia \u0111\xECnh tin t\u01B0\u1EDFng. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC9D1 \uC8FC\uC18C\uB294 \uAC1C\uC778 \uC815\uBCF4\uC608\uC694. \uAC00\uC871\uC774 \uBBFF\uB294 \uC0AC\uB78C\uC5D0\uAC8C\uB9CC \uC54C\uB824 \uC918\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Say, \u201CI need to ask my dad.\u201D", good: true, out: s3("Good choice. A grown-up Joon trusts can answer for him.", "L\u1EF1a ch\u1ECDn t\u1ED1t. Ng\u01B0\u1EDDi l\u1EDBn m\xE0 Joon tin t\u01B0\u1EDFng c\xF3 th\u1EC3 tr\u1EA3 l\u1EDDi thay b\u1EA1n \u1EA5y.", "\uC88B\uC740 \uC120\uD0DD\uC774\uC5D0\uC694. \uC900\uC774 \uBBFF\uB294 \uC5B4\uB978\uC774 \uB300\uC2E0 \uB300\uB2F5\uD574 \uC904 \uC218 \uC788\uC5B4\uC694.") }
            ]
          },
          { t: "pick", q: "Who can help you? Tap a grown-up you trust.", h: h("Ai c\xF3 th\u1EC3 gi\xFAp b\u1EA1n? H\xE3y ch\u1EA1m v\xE0o ng\u01B0\u1EDDi l\u1EDBn m\xE0 b\u1EA1n tin t\u01B0\u1EDFng.", "\uB204\uAC00 \uB3C4\uC640\uC904 \uC218 \uC788\uC744\uAE4C\uC694? \uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978\uC744 \uB20C\uB7EC\uC694."), opts: [["\u{1F468}\u200D\u{1F467}", "my dad"], ["\u{1F9F8}", "my teddy"], ["\u{1F426}", "a bird"]], a: "my dad" },
          { t: "order", q: "Say the safe sentence.", h: h("N\xF3i c\xE2u gi\u1EEF an to\xE0n.", "\uC548\uC804\uC744 \uC9C0\uD0A4\uB294 \uBB38\uC7A5\uC744 \uB9D0\uD574\uC694."), words: ["I will ask", "a grown-up", "I trust."] },
          { t: "say", s: "I will ask a grown-up I trust." }
        ],
        junior: [
          {
            t: "choice",
            who: ["joon"],
            story: s3("At the park, a grown-up Joon does not know asks, \u201CWhat is your name? Where do you live?\u201D What can Joon do?", "\u1EDE c\xF4ng vi\xEAn, m\u1ED9t ng\u01B0\u1EDDi l\u1EDBn m\xE0 Joon kh\xF4ng quen h\u1ECFi: \u201CCh\xE1u t\xEAn g\xEC? Nh\xE0 ch\xE1u \u1EDF \u0111\xE2u?\u201D Joon c\xF3 th\u1EC3 l\xE0m g\xEC?", "\uACF5\uC6D0\uC5D0\uC11C \uC900\uC774 \uBAA8\uB974\uB294 \uC5B4\uB978\uC774 \u201C\uC774\uB984\uC774 \uBB50\uB2C8? \uC5B4\uB514 \uC0AC\uB2C8?\u201D \uD558\uACE0 \uBB3C\uC5B4\uC694. \uC900\uC740 \uC5B4\uB5BB\uAC8C \uD558\uBA74 \uC88B\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Say, \u201CI need to ask my dad,\u201D and walk to him.", good: true, out: s3("Joon walks to his dad. A grown-up he trusts can decide what to share.", "Joon \u0111i v\u1EC1 ph\xEDa b\u1ED1. Ng\u01B0\u1EDDi l\u1EDBn m\xE0 b\u1EA1n \u1EA5y tin t\u01B0\u1EDFng s\u1EBD quy\u1EBFt \u0111\u1ECBnh n\xEAn n\xF3i \u0111i\u1EC1u g\xEC.", "\uC900\uC740 \uC544\uBE60\uC5D0\uAC8C \uAC00\uC694. \uBBFF\uC744 \uC218 \uC788\uB294 \uC5B4\uB978\uC774 \uBB34\uC5C7\uC744 \uC54C\uB824 \uC904\uC9C0 \uC815\uD560 \uC218 \uC788\uC5B4\uC694.") },
              { l: "Tell them his name and address.", good: false, out: s3("A name and address are private. We share them only with people our family trusts. Let\u2019s try another idea.", "T\xEAn v\xE0 \u0111\u1ECBa ch\u1EC9 l\xE0 th\xF4ng tin ri\xEAng. Ch\xFAng ta ch\u1EC9 n\xF3i v\u1EDBi nh\u1EEFng ng\u01B0\u1EDDi m\xE0 gia \u0111\xECnh tin t\u01B0\u1EDFng. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uC774\uB984\uACFC \uC8FC\uC18C\uB294 \uAC1C\uC778 \uC815\uBCF4\uC608\uC694. \uAC00\uC871\uC774 \uBBFF\uB294 \uC0AC\uB78C\uC5D0\uAC8C\uB9CC \uC54C\uB824 \uC918\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") },
              { l: "Move away and find his teacher.", good: true, out: s3("Joon finds his teacher. Asking for help is a strong choice.", "Joon t\xECm th\u1EA5y c\xF4 gi\xE1o. Nh\u1EDD gi\xFAp \u0111\u1EE1 l\xE0 m\u1ED9t l\u1EF1a ch\u1ECDn m\u1EA1nh m\u1EBD.", "\uC900\uC740 \uC120\uC0DD\uB2D8\uC744 \uCC3E\uC544\uAC00\uC694. \uB3C4\uC6C0\uC744 \uCCAD\uD558\uB294 \uAC83\uC740 \uBA4B\uC9C4 \uC120\uD0DD\uC774\uC5D0\uC694.") }
            ]
          },
          { t: "pick", q: "Which information is private?", h: h("Th\xF4ng tin n\xE0o l\xE0 ri\xEAng t\u01B0?", "\uC5B4\uB290 \uAC83\uC774 \uAC1C\uC778 \uC815\uBCF4\uC77C\uAE4C\uC694?"), opts: ["My home address", "My favorite color", "My favorite animal"], a: "My home address" },
          {
            t: "choice",
            who: ["joon"],
            story: s3("In an online game, a player Joon does not know writes, \u201CWhat school do you go to?\u201D What can Joon do?", "Trong m\u1ED9t tr\xF2 ch\u01A1i tr\u1EF1c tuy\u1EBFn, m\u1ED9t ng\u01B0\u1EDDi ch\u01A1i m\xE0 Joon kh\xF4ng quen vi\u1EBFt: \u201CB\u1EA1n h\u1ECDc tr\u01B0\u1EDDng n\xE0o?\u201D Joon c\xF3 th\u1EC3 l\xE0m g\xEC?", "\uC628\uB77C\uC778 \uAC8C\uC784\uC5D0\uC11C \uC900\uC774 \uBAA8\uB974\uB294 \uC0AC\uB78C\uC774 \u201C\uC5B4\uB290 \uD559\uAD50 \uB2E4\uB140?\u201D \uD558\uACE0 \uBB3C\uC5B4\uC694. \uC900\uC740 \uC5B4\uB5BB\uAC8C \uD558\uBA74 \uC88B\uC744\uAE4C\uC694?"),
            opts: [
              { l: "Do not answer, and tell a parent.", good: true, out: s3("Joon\u2019s mom helps him block the player. Telling a grown-up was smart.", "M\u1EB9 gi\xFAp Joon ch\u1EB7n ng\u01B0\u1EDDi ch\u01A1i \u0111\xF3. N\xF3i v\u1EDBi ng\u01B0\u1EDDi l\u1EDBn l\xE0 r\u1EA5t th\xF4ng minh.", "\uC5C4\uB9C8\uAC00 \uADF8 \uC0AC\uB78C\uC744 \uCC28\uB2E8\uD558\uB3C4\uB85D \uB3C4\uC640\uC918\uC694. \uC5B4\uB978\uC5D0\uAC8C \uB9D0\uD55C \uAC83\uC740 \uD604\uBA85\uD588\uC5B4\uC694.") },
              { l: "Type the name of his school.", good: false, out: s3("A school name is private too. Let\u2019s try another idea.", "T\xEAn tr\u01B0\u1EDDng c\u0169ng l\xE0 th\xF4ng tin ri\xEAng. M\xECnh th\u1EED \xFD kh\xE1c nh\xE9.", "\uD559\uAD50 \uC774\uB984\uB3C4 \uAC1C\uC778 \uC815\uBCF4\uC608\uC694. \uB2E4\uB978 \uBC29\uBC95\uC744 \uC0DD\uAC01\uD574 \uBD10\uC694.") }
            ]
          },
          { t: "order", q: "Build the safe sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u gi\u1EEF an to\xE0n.", "\uC548\uC804\uC744 \uC9C0\uD0A4\uB294 \uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["I", "will", "ask", "a", "grown-up", "I", "trust."] },
          { t: "say", s: "I will ask a grown-up I trust." }
        ]
      }
    },
    {
      id: "m-tet",
      building: "plaza",
      pillar: "culture",
      age: "4\u201310",
      needs: 5,
      skills: ["culture"],
      who: ["mai"],
      title: s3("T\u1EBFt with Family", "T\u1EBFt b\xEAn gia \u0111\xECnh", "\uAC00\uC871\uACFC \uD568\uAED8\uD558\uB294 \uB5CF"),
      objective: s3("Discover how many Vietnamese families celebrate T\u1EBFt, and say New Year wishes in English.", "Kh\xE1m ph\xE1 c\xE1ch nhi\u1EC1u gia \u0111\xECnh Vi\u1EC7t Nam \u0111\xF3n T\u1EBFt v\xE0 n\xF3i l\u1EDDi ch\xFAc n\u0103m m\u1EDBi b\u1EB1ng ti\u1EBFng Anh.", "\uBCA0\uD2B8\uB0A8\uC758 \uB9CE\uC740 \uAC00\uC871\uC774 \uB5CF(\uC124)\uC744 \uC5B4\uB5BB\uAC8C \uBCF4\uB0B4\uB294\uC9C0 \uC54C\uC544\uBCF4\uACE0, \uC601\uC5B4\uB85C \uC0C8\uD574 \uC778\uC0AC\uB97C \uD574\uC694."),
      scenario: s3("Mai\u2019s family is getting ready for T\u1EBFt, the Lunar New Year in Vietnam. Help build a Festival Plaza for the celebration!", "Gia \u0111\xECnh Mai \u0111ang chu\u1EA9n b\u1ECB \u0111\xF3n T\u1EBFt Nguy\xEAn \u0111\xE1n c\u1EE7a Vi\u1EC7t Nam. H\xE3y gi\xFAp x\xE2y Qu\u1EA3ng tr\u01B0\u1EDDng L\u1EC5 h\u1ED9i \u0111\u1EC3 c\xF9ng vui T\u1EBFt!", "\uB9C8\uC774\uB124 \uAC00\uC871\uC774 \uBCA0\uD2B8\uB0A8\uC758 \uC74C\uB825 \uC124\uC778 \uB5CF\uC744 \uC900\uBE44\uD558\uACE0 \uC788\uC5B4\uC694. \uD568\uAED8 \uCD95\uC81C \uAD11\uC7A5\uC744 \uC9C0\uC5B4\uC694!"),
      lesson: s3("Families around the world welcome a new year in their own ways. We can be curious and respectful.", "C\xE1c gia \u0111\xECnh tr\xEAn kh\u1EAFp th\u1EBF gi\u1EDBi \u0111\xF3n n\u0103m m\u1EDBi theo c\xE1ch ri\xEAng c\u1EE7a m\xECnh. Ch\xFAng ta c\xF3 th\u1EC3 t\xF2 m\xF2 t\xECm hi\u1EC3u v\xE0 t\xF4n tr\u1ECDng.", "\uC138\uACC4\uC758 \uAC00\uC871\uB4E4\uC740 \uC800\uB9C8\uB2E4\uC758 \uBC29\uC2DD\uC73C\uB85C \uC0C8\uD574\uB97C \uB9DE\uC544\uC694. \uAD81\uAE08\uD574\uD558\uACE0 \uC874\uC911\uD558\uB294 \uB9C8\uC74C\uC744 \uAC00\uC838\uC694."),
      feedback: s3("Happy New Year! You learned about T\u1EBFt.", "Ch\xFAc m\u1EEBng n\u0103m m\u1EDBi! B\u1EA1n \u0111\xE3 hi\u1EC3u th\xEAm v\u1EC1 T\u1EBFt.", "\uC0C8\uD574 \uBCF5 \uB9CE\uC774 \uBC1B\uC73C\uC138\uC694! \uB5CF\uC5D0 \uB300\uD574 \uBC30\uC6E0\uC5B4\uC694."),
      vocab: [v("New Year", "\u{1F386}", "n\u0103m m\u1EDBi", "\uC0C8\uD574"), v("family", "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", "gia \u0111\xECnh", "\uAC00\uC871"), v("lucky money", "\u{1F9E7}", "ti\u1EC1n l\xEC x\xEC", "\uC138\uBC43\uB3C8"), v("flower", "\u{1F338}", "hoa", "\uAF43"), v("wish", "\u{1F48C}", "l\u1EDDi ch\xFAc", "\uB355\uB2F4")],
      target: "Happy New Year! We visit our family.",
      targetHelp: h("Ch\xFAc m\u1EEBng n\u0103m m\u1EDBi! Ch\xFAng m\xECnh \u0111i th\u0103m gia \u0111\xECnh.", "\uC0C8\uD574 \uBCF5 \uB9CE\uC774 \uBC1B\uC73C\uC138\uC694! \uC6B0\uB9AC\uB294 \uAC00\uC871\uC744 \uCC3E\uC544\uAC00\uC694."),
      steps: {
        little: [
          { t: "learn", cards: [
            { e: "\u{1F338}", s: "T\u1EBFt is the New Year in Vietnam. Families decorate with flowers.", h: h("T\u1EBFt l\xE0 n\u0103m m\u1EDBi \u1EDF Vi\u1EC7t Nam. C\xE1c gia \u0111\xECnh trang tr\xED nh\xE0 b\u1EB1ng hoa.", "\uB5CF\uC740 \uBCA0\uD2B8\uB0A8\uC758 \uC124\uC774\uC5D0\uC694. \uAC00\uC871\uB4E4\uC740 \uAF43\uC73C\uB85C \uC9D1\uC744 \uAFB8\uBA70\uC694.") },
            { e: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", s: "We visit our family.", h: h("Ch\xFAng m\xECnh \u0111i th\u0103m gia \u0111\xECnh.", "\uC6B0\uB9AC\uB294 \uAC00\uC871\uC744 \uCC3E\uC544\uAC00\uC694.") },
            { e: "\u{1F9E7}", s: "Children get lucky money in red envelopes.", h: h("Tr\u1EBB em \u0111\u01B0\u1EE3c nh\u1EADn ti\u1EC1n l\xEC x\xEC trong phong bao \u0111\u1ECF.", "\uC544\uC774\uB4E4\uC740 \uBE68\uAC04 \uBD09\uD22C\uC5D0 \uB2F4\uAE34 \uC138\uBC43\uB3C8\uC744 \uBC1B\uC544\uC694.") }
          ] },
          { t: "pick", q: "At T\u1EBFt, who do we visit?", h: h("Ng\xE0y T\u1EBFt, ch\xFAng ta \u0111i th\u0103m ai?", "\uB5CF\uC5D0\uB294 \uB204\uAD6C\uB97C \uCC3E\uC544\uAC08\uAE4C\uC694?"), opts: [["\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", "our family"], ["\u{1F916}", "a robot"], ["\u{1F319}", "the moon"]], a: "our family" },
          { t: "pick", q: "Tap the lucky money.", h: h("H\xE3y ch\u1EA1m v\xE0o ti\u1EC1n l\xEC x\xEC.", "\uC138\uBC43\uB3C8\uC744 \uB20C\uB7EC\uC694."), opts: ["lucky money", ["\u{1F382}", "cake"], ["\u26BD", "ball"]], a: "lucky money" },
          { t: "order", q: "Say the New Year wish.", h: h("N\xF3i l\u1EDDi ch\xFAc n\u0103m m\u1EDBi.", "\uC0C8\uD574 \uC778\uC0AC\uB97C \uD574\uC694."), words: ["Happy", "New", "Year!"] },
          { t: "say", s: "Happy New Year! We visit our family." }
        ],
        junior: [
          { t: "learn", cards: [
            { e: "\u{1F386}", s: "T\u1EBFt is the Lunar New Year in Vietnam. People say, \u201CCh\xFAc m\u1EEBng n\u0103m m\u1EDBi!\u201D It means \u201CHappy New Year!\u201D", h: h("T\u1EBFt l\xE0 T\u1EBFt Nguy\xEAn \u0111\xE1n c\u1EE7a Vi\u1EC7t Nam. M\u1ECDi ng\u01B0\u1EDDi n\xF3i: \u201CCh\xFAc m\u1EEBng n\u0103m m\u1EDBi!\u201D", "\uB5CF\uC740 \uBCA0\uD2B8\uB0A8\uC758 \uC74C\uB825 \uC124\uC774\uC5D0\uC694. \uC0AC\uB78C\uB4E4\uC740 \u201C\uCB49 \uBBD5 \uB0A8 \uBA38\uC774!\u201D\uB77C\uACE0 \uC778\uC0AC\uD574\uC694. \u201C\uC0C8\uD574 \uBCF5 \uB9CE\uC774 \uBC1B\uC73C\uC138\uC694\u201D\uB77C\uB294 \uB73B\uC774\uC5D0\uC694.") },
            { e: "\u{1F338}", s: "Before T\u1EBFt, families clean and decorate their homes. Many families in the north have pink peach blossoms. Many in the south have yellow apricot blossoms.", h: h("Tr\u01B0\u1EDBc T\u1EBFt, c\xE1c gia \u0111\xECnh d\u1ECDn d\u1EB9p v\xE0 trang tr\xED nh\xE0 c\u1EEDa. Nhi\u1EC1u gia \u0111\xECnh mi\u1EC1n B\u1EAFc ch\u01B0ng hoa \u0111\xE0o, nhi\u1EC1u gia \u0111\xECnh mi\u1EC1n Nam ch\u01B0ng hoa mai.", "\uB5CF \uC804\uC5D0 \uAC00\uC871\uB4E4\uC740 \uC9D1\uC744 \uCCAD\uC18C\uD558\uACE0 \uAFB8\uBA70\uC694. \uBD81\uBD80\uC758 \uB9CE\uC740 \uC9D1\uC740 \uBD84\uD64D \uBCF5\uC22D\uC544\uAF43\uC744, \uB0A8\uBD80\uC758 \uB9CE\uC740 \uC9D1\uC740 \uB178\uB780 \uB9E4\uD654\uB97C \uC7A5\uC2DD\uD574\uC694.") },
            { e: "\u{1F35A}", s: "Families cook together. Many make b\xE1nh ch\u01B0ng or b\xE1nh t\xE9t, which are sticky rice cakes.", h: h("C\u1EA3 nh\xE0 c\xF9ng n\u1EA5u \u0103n. Nhi\u1EC1u gia \u0111\xECnh g\xF3i b\xE1nh ch\u01B0ng ho\u1EB7c b\xE1nh t\xE9t.", "\uAC00\uC871\uC774 \uD568\uAED8 \uC694\uB9AC\uD574\uC694. \uB9CE\uC740 \uC9D1\uC5D0\uC11C \uCC39\uC300\uB85C \uB9CC\uB4E0 \uB5A1\uC778 \uBC18\uCBE9\uC774\uB098 \uBC18\uB5CF\uC744 \uB9CC\uB4E4\uC5B4\uC694.") },
            { e: "\u{1F9E7}", s: "Children wish their grandparents good health. They receive lucky money in red envelopes.", h: h("Tr\u1EBB em ch\xFAc \xF4ng b\xE0 m\u1EA1nh kh\u1ECFe v\xE0 \u0111\u01B0\u1EE3c nh\u1EADn l\xEC x\xEC trong phong bao \u0111\u1ECF.", "\uC544\uC774\uB4E4\uC740 \uD560\uBA38\uB2C8, \uD560\uC544\uBC84\uC9C0\uAED8 \uAC74\uAC15\uC744 \uBE4C\uC5B4 \uB4DC\uB9AC\uACE0, \uBE68\uAC04 \uBD09\uD22C\uC5D0 \uB2F4\uAE34 \uC138\uBC43\uB3C8\uC744 \uBC1B\uC544\uC694.") }
          ] },
          { t: "pick", q: "What do children wish their grandparents at T\u1EBFt?", h: h("Ng\xE0y T\u1EBFt, tr\u1EBB em ch\xFAc \xF4ng b\xE0 \u0111i\u1EC1u g\xEC?", "\uB5CF\uC5D0 \uC544\uC774\uB4E4\uC740 \uD560\uBA38\uB2C8, \uD560\uC544\uBC84\uC9C0\uAED8 \uBB34\uC5C7\uC744 \uBE4C\uC5B4 \uB4DC\uB9AC\uB098\uC694?"), opts: ["Good health", "Good night", "Goodbye"], a: "Good health" },
          { t: "pick", q: "Why is T\u1EBFt special for families?", h: h("V\xEC sao T\u1EBFt \u0111\u1EB7c bi\u1EC7t v\u1EDBi c\xE1c gia \u0111\xECnh?", "\uB5CF\uC740 \uC65C \uAC00\uC871\uC5D0\uAC8C \uD2B9\uBCC4\uD560\uAE4C\uC694?"), opts: ["Families come together and share good wishes.", "Everyone stays alone.", "Nobody eats anything."], a: "Families come together and share good wishes." },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["We", "visit", "our", "family."] },
          {
            t: "choice",
            who: ["mai"],
            story: s3("Mai asks, \u201CHow does your family welcome a new year?\u201D Every answer is a good answer.", "Mai h\u1ECFi: \u201CGia \u0111\xECnh b\u1EA1n \u0111\xF3n n\u0103m m\u1EDBi nh\u01B0 th\u1EBF n\xE0o?\u201D C\xE2u tr\u1EA3 l\u1EDDi n\xE0o c\u0169ng \u0111\xFAng.", "\uB9C8\uC774\uAC00 \uBB3C\uC5B4\uC694. \u201C\uB108\uD76C \uAC00\uC871\uC740 \uC0C8\uD574\uB97C \uC5B4\uB5BB\uAC8C \uB9DE\uC774\uD574?\u201D \uC5B4\uB5A4 \uB2F5\uC774\uB4E0 \uC88B\uC740 \uB2F5\uC774\uC5D0\uC694."),
            opts: [
              { l: "We eat a special meal.", good: true, out: s3("\u201CThat sounds delicious!\u201D says Mai. Every family has its own way.", "\u201CNghe ngon qu\xE1!\u201D Mai n\xF3i. M\u1ED7i gia \u0111\xECnh c\xF3 m\u1ED9t c\xE1ch ri\xEAng.", "\u201C\uB9DB\uC788\uACA0\uB2E4!\u201D \uB9C8\uC774\uAC00 \uB9D0\uD574\uC694. \uAC00\uC871\uB9C8\uB2E4 \uC800\uB9C8\uB2E4\uC758 \uBC29\uC2DD\uC774 \uC788\uC5B4\uC694.") },
              { l: "We visit our family.", good: true, out: s3("\u201CWe do that too!\u201D says Mai. Families can be alike and different.", "\u201CNh\xE0 m\xECnh c\u0169ng v\u1EADy!\u201D Mai n\xF3i. C\xE1c gia \u0111\xECnh c\xF3 \u0111i\u1EC3m gi\u1ED1ng v\xE0 c\u0169ng c\xF3 \u0111i\u1EC3m kh\xE1c nhau.", "\u201C\uC6B0\uB9AC\uB3C4 \uADF8\uB798!\u201D \uB9C8\uC774\uAC00 \uB9D0\uD574\uC694. \uAC00\uC871\uB4E4\uC740 \uC11C\uB85C \uB2EE\uAE30\uB3C4 \uD558\uACE0 \uB2E4\uB974\uAE30\uB3C4 \uD574\uC694.") },
              { l: "We do something else.", good: true, out: s3("\u201CI would love to hear about it,\u201D says Mai. Every family has its own way.", "\u201CM\xECnh r\u1EA5t mu\u1ED1n nghe k\u1EC3,\u201D Mai n\xF3i. M\u1ED7i gia \u0111\xECnh c\xF3 m\u1ED9t c\xE1ch ri\xEAng.", "\u201C\uC5B4\uB5A4 \uAC74\uC9C0 \uB4E3\uACE0 \uC2F6\uC5B4.\u201D \uB9C8\uC774\uAC00 \uB9D0\uD574\uC694. \uAC00\uC871\uB9C8\uB2E4 \uC800\uB9C8\uB2E4\uC758 \uBC29\uC2DD\uC774 \uC788\uC5B4\uC694.") }
            ]
          },
          { t: "say", s: "Happy New Year! We visit our family." }
        ]
      }
    },
    {
      id: "m-chuseok",
      building: "culture",
      pillar: "culture",
      age: "4\u201310",
      needs: 5,
      skills: ["culture"],
      who: ["joon"],
      title: s3("Thankful at Chuseok", "Bi\u1EBFt \u01A1n trong ng\xE0y Chuseok", "\uAC10\uC0AC\uD55C \uCD94\uC11D"),
      objective: s3("Discover how many Korean families celebrate Chuseok, and say thank you in English.", "Kh\xE1m ph\xE1 c\xE1ch nhi\u1EC1u gia \u0111\xECnh H\xE0n Qu\u1ED1c \u0111\xF3n Chuseok v\xE0 n\xF3i l\u1EDDi c\u1EA3m \u01A1n b\u1EB1ng ti\u1EBFng Anh.", "\uD55C\uAD6D\uC758 \uB9CE\uC740 \uAC00\uC871\uC774 \uCD94\uC11D\uC744 \uC5B4\uB5BB\uAC8C \uBCF4\uB0B4\uB294\uC9C0 \uC54C\uC544\uBCF4\uACE0, \uC601\uC5B4\uB85C \uAC10\uC0AC\uB97C \uD45C\uD604\uD574\uC694."),
      scenario: s3("Joon\u2019s family is getting ready for Chuseok, a harvest holiday in Korea. Help build a Culture House to share the story!", "Gia \u0111\xECnh Joon \u0111ang chu\u1EA9n b\u1ECB \u0111\xF3n Chuseok, ng\xE0y l\u1EC5 m\xF9a thu ho\u1EA1ch \u1EDF H\xE0n Qu\u1ED1c. H\xE3y gi\xFAp x\xE2y Nh\xE0 V\u0103n h\xF3a \u0111\u1EC3 k\u1EC3 c\xE2u chuy\u1EC7n n\xE0y!", "\uC900\uC774\uB124 \uAC00\uC871\uC774 \uD55C\uAD6D\uC758 \uCD94\uC218 \uBA85\uC808\uC778 \uCD94\uC11D\uC744 \uC900\uBE44\uD558\uACE0 \uC788\uC5B4\uC694. \uC774\uC57C\uAE30\uB97C \uB098\uB20C \uBB38\uD654\uC758 \uC9D1\uC744 \uC9C0\uC5B4\uC694!"),
      lesson: s3("Saying thank you for food, family and friends matters in every culture.", "N\xF3i l\u1EDDi c\u1EA3m \u01A1n v\xEC c\xF3 th\u1EE9c \u0103n, gia \u0111\xECnh v\xE0 b\u1EA1n b\xE8 l\xE0 \u0111i\u1EC1u quan tr\u1ECDng \u1EDF m\u1ECDi n\u1EC1n v\u0103n h\xF3a.", "\uC74C\uC2DD\uACFC \uAC00\uC871, \uCE5C\uAD6C\uC5D0\uAC8C \uAC10\uC0AC\uD558\uB294 \uB9C8\uC74C\uC740 \uC5B4\uB290 \uBB38\uD654\uC5D0\uC11C\uB098 \uC18C\uC911\uD574\uC694."),
      feedback: s3("Thank you! You learned about Chuseok.", "C\u1EA3m \u01A1n b\u1EA1n! B\u1EA1n \u0111\xE3 hi\u1EC3u th\xEAm v\u1EC1 Chuseok.", "\uACE0\uB9C8\uC6CC\uC694! \uCD94\uC11D\uC5D0 \uB300\uD574 \uBC30\uC6E0\uC5B4\uC694."),
      vocab: [v("moon", "\u{1F315}", "m\u1EB7t tr\u0103ng", "\uB2EC"), v("harvest", "\u{1F33E}", "m\xF9a thu ho\u1EA1ch", "\uCD94\uC218"), v("thankful", "\u{1F49B}", "bi\u1EBFt \u01A1n", "\uAC10\uC0AC\uD558\uB294"), v("family", "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", "gia \u0111\xECnh", "\uAC00\uC871"), v("grandparents", "\u{1F475}", "\xF4ng b\xE0", "\uD560\uBA38\uB2C8, \uD560\uC544\uBC84\uC9C0")],
      target: "We celebrate Chuseok. We are thankful for our family.",
      targetHelp: h("Ch\xFAng m\xECnh \u0111\xF3n Chuseok. Ch\xFAng m\xECnh bi\u1EBFt \u01A1n gia \u0111\xECnh.", "\uC6B0\uB9AC\uB294 \uCD94\uC11D\uC744 \uC9C0\uB0B4\uC694. \uC6B0\uB9AC\uB294 \uAC00\uC871\uC5D0\uAC8C \uAC10\uC0AC\uD574\uC694."),
      steps: {
        little: [
          { t: "learn", cards: [
            { e: "\u{1F315}", s: "Chuseok is a harvest holiday in Korea. The moon is big and round.", h: h("Chuseok l\xE0 ng\xE0y l\u1EC5 m\xF9a thu ho\u1EA1ch \u1EDF H\xE0n Qu\u1ED1c. Tr\u0103ng to v\xE0 tr\xF2n.", "\uCD94\uC11D\uC740 \uD55C\uAD6D\uC758 \uCD94\uC218 \uBA85\uC808\uC774\uC5D0\uC694. \uB2EC\uC774 \uD06C\uACE0 \uB465\uAE00\uC5B4\uC694.") },
            { e: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", s: "Families come together.", h: h("C\xE1c gia \u0111\xECnh sum h\u1ECDp.", "\uAC00\uC871\uB4E4\uC774 \uD55C\uC790\uB9AC\uC5D0 \uBAA8\uC5EC\uC694.") },
            { e: "\u{1F319}", s: "They make songpyeon. Songpyeon are rice cakes shaped like a half-moon.", h: h("M\u1ECDi ng\u01B0\u1EDDi l\xE0m songpyeon, lo\u1EA1i b\xE1nh g\u1EA1o c\xF3 h\xECnh b\xE1n nguy\u1EC7t.", "\uC1A1\uD3B8\uC744 \uBE5A\uC5B4\uC694. \uC1A1\uD3B8\uC740 \uBC18\uB2EC \uBAA8\uC591\uC758 \uB5A1\uC774\uC5D0\uC694.") }
          ] },
          { t: "pick", q: "Tap the moon.", h: h("H\xE3y ch\u1EA1m v\xE0o m\u1EB7t tr\u0103ng.", "\uB2EC\uC744 \uB20C\uB7EC\uC694."), opts: ["moon", ["\u2600\uFE0F", "sun"], ["\u2B50", "star"]], a: "moon" },
          { t: "pick", q: "Who comes together at Chuseok?", h: h("Ai sum h\u1ECDp trong ng\xE0y Chuseok?", "\uCD94\uC11D\uC5D0\uB294 \uB204\uAC00 \uBAA8\uC77C\uAE4C\uC694?"), opts: ["family", ["\u{1F697}", "cars"], ["\u{1F427}", "penguins"]], a: "family" },
          { t: "order", q: "Say what we do.", h: h("N\xF3i \u0111i\u1EC1u ch\xFAng ta l\xE0m.", "\uC6B0\uB9AC\uAC00 \uD558\uB294 \uC77C\uC744 \uB9D0\uD574\uC694."), words: ["We", "celebrate", "Chuseok."] },
          { t: "say", s: "We are thankful for our family." }
        ],
        junior: [
          { t: "learn", cards: [
            { e: "\u{1F315}", s: "Chuseok is a big harvest holiday in Korea. It comes in autumn, when the moon is full.", h: h("Chuseok l\xE0 ng\xE0y l\u1EC5 l\u1EDBn m\u1EEBng m\xF9a thu ho\u1EA1ch \u1EDF H\xE0n Qu\u1ED1c, di\u1EC5n ra v\xE0o m\xF9a thu khi tr\u0103ng tr\xF2n.", "\uCD94\uC11D\uC740 \uD55C\uAD6D\uC758 \uD070 \uCD94\uC218 \uBA85\uC808\uC774\uC5D0\uC694. \uAC00\uC744\uC5D0 \uBCF4\uB984\uB2EC\uC774 \uB730 \uB54C \uCC3E\uC544\uC640\uC694.") },
            { e: "\u{1F33E}", s: "People say thank you for the food from the harvest and remember their family.", h: h("M\u1ECDi ng\u01B0\u1EDDi c\u1EA3m \u01A1n v\xEC c\xF3 l\u01B0\u01A1ng th\u1EF1c t\u1EEB m\xF9a m\xE0ng v\xE0 nh\u1EDB v\u1EC1 gia \u0111\xECnh, t\u1ED5 ti\xEAn.", "\uC0AC\uB78C\uB4E4\uC740 \uCD94\uC218\uD55C \uC74C\uC2DD\uC5D0 \uAC10\uC0AC\uD558\uACE0 \uAC00\uC871\uACFC \uC870\uC0C1\uC744 \uAE30\uC5B5\uD574\uC694.") },
            { e: "\u{1F319}", s: "Families make songpyeon together. Songpyeon are rice cakes shaped like a half-moon.", h: h("C\u1EA3 nh\xE0 c\xF9ng l\xE0m songpyeon, lo\u1EA1i b\xE1nh g\u1EA1o c\xF3 h\xECnh b\xE1n nguy\u1EC7t.", "\uAC00\uC871\uC774 \uD568\uAED8 \uC1A1\uD3B8\uC744 \uBE5A\uC5B4\uC694. \uC1A1\uD3B8\uC740 \uBC18\uB2EC \uBAA8\uC591\uC758 \uB5A1\uC774\uC5D0\uC694.") },
            { e: "\u{1F686}", s: "Today, some families travel to their hometown. Others celebrate at home. Every family has its own way.", h: h("Ng\xE0y nay, c\xF3 gia \u0111\xECnh v\u1EC1 qu\xEA, c\xF3 gia \u0111\xECnh \u0111\xF3n l\u1EC5 t\u1EA1i nh\xE0. M\u1ED7i gia \u0111\xECnh c\xF3 m\u1ED9t c\xE1ch ri\xEAng.", "\uC694\uC998\uC740 \uACE0\uD5A5\uC5D0 \uAC00\uB294 \uAC00\uC871\uB3C4 \uC788\uACE0, \uC9D1\uC5D0\uC11C \uBCF4\uB0B4\uB294 \uAC00\uC871\uB3C4 \uC788\uC5B4\uC694. \uAC00\uC871\uB9C8\uB2E4 \uC800\uB9C8\uB2E4\uC758 \uBC29\uC2DD\uC774 \uC788\uC5B4\uC694.") }
          ] },
          { t: "pick", q: "What shape is songpyeon?", h: h("B\xE1nh songpyeon c\xF3 h\xECnh g\xEC?", "\uC1A1\uD3B8\uC740 \uBB34\uC2A8 \uBAA8\uC591\uC778\uAC00\uC694?"), opts: ["A half-moon", "A square", "A star"], a: "A half-moon" },
          { t: "pick", q: "What are people thankful for at Chuseok?", h: h("V\xE0o ng\xE0y Chuseok, m\u1ECDi ng\u01B0\u1EDDi bi\u1EBFt \u01A1n \u0111i\u1EC1u g\xEC?", "\uCD94\uC11D\uC5D0 \uC0AC\uB78C\uB4E4\uC740 \uBB34\uC5C7\uC5D0 \uAC10\uC0AC\uD558\uB098\uC694?"), opts: ["The harvest and their family", "New toys", "Rainy days"], a: "The harvest and their family" },
          { t: "order", q: "Build the sentence.", h: h("S\u1EAFp x\u1EBFp th\xE0nh c\xE2u.", "\uBB38\uC7A5\uC744 \uB9CC\uB4E4\uC5B4\uC694."), words: ["We", "are", "thankful", "for", "our", "family."] },
          {
            t: "choice",
            who: ["joon"],
            story: s3("Joon asks, \u201CWhat are you thankful for?\u201D Every answer is a good answer.", "Joon h\u1ECFi: \u201CB\u1EA1n bi\u1EBFt \u01A1n \u0111i\u1EC1u g\xEC?\u201D C\xE2u tr\u1EA3 l\u1EDDi n\xE0o c\u0169ng \u0111\xFAng.", "\uC900\uC774 \uBB3C\uC5B4\uC694. \u201C\uB108\uB294 \uBB34\uC5C7\uC5D0 \uAC10\uC0AC\uD574?\u201D \uC5B4\uB5A4 \uB2F5\uC774\uB4E0 \uC88B\uC740 \uB2F5\uC774\uC5D0\uC694."),
            opts: [
              { l: "I am thankful for my family.", good: true, out: s3("\u201CMe too,\u201D says Joon. Saying thank you makes hearts warm.", "\u201CM\xECnh c\u0169ng v\u1EADy,\u201D Joon n\xF3i. L\u1EDDi c\u1EA3m \u01A1n l\xE0m \u1EA5m l\xF2ng m\u1ECDi ng\u01B0\u1EDDi.", "\u201C\uB098\uB3C4 \uADF8\uB798.\u201D \uC900\uC774 \uB9D0\uD574\uC694. \uACE0\uB9D9\uB2E4\uB294 \uB9D0\uC740 \uB9C8\uC74C\uC744 \uB530\uB73B\uD558\uAC8C \uD574\uC694.") },
              { l: "I am thankful for my friends.", good: true, out: s3("\u201CFriends are special,\u201D says Joon. Saying thank you makes hearts warm.", "\u201CB\u1EA1n b\xE8 th\u1EADt \u0111\u1EB7c bi\u1EC7t,\u201D Joon n\xF3i. L\u1EDDi c\u1EA3m \u01A1n l\xE0m \u1EA5m l\xF2ng m\u1ECDi ng\u01B0\u1EDDi.", "\u201C\uCE5C\uAD6C\uB294 \uC18C\uC911\uD574.\u201D \uC900\uC774 \uB9D0\uD574\uC694. \uACE0\uB9D9\uB2E4\uB294 \uB9D0\uC740 \uB9C8\uC74C\uC744 \uB530\uB73B\uD558\uAC8C \uD574\uC694.") },
              { l: "I am thankful for good food.", good: true, out: s3("\u201CYum!\u201D says Joon. Many people worked to grow that food.", "\u201CNgon qu\xE1!\u201D Joon n\xF3i. R\u1EA5t nhi\u1EC1u ng\u01B0\u1EDDi \u0111\xE3 v\u1EA5t v\u1EA3 \u0111\u1EC3 l\xE0m ra th\u1EE9c \u0103n \u1EA5y.", "\u201C\uB9DB\uC788\uACA0\uB2E4!\u201D \uC900\uC774 \uB9D0\uD574\uC694. \uADF8 \uC74C\uC2DD\uC744 \uAE30\uB974\uB824\uACE0 \uB9CE\uC740 \uC0AC\uB78C\uC774 \uC560\uC37C\uC5B4\uC694.") }
            ]
          },
          { t: "say", s: "We celebrate Chuseok. We are thankful for our family." }
        ]
      }
    }
  ];
  var MISSIONS_BY_ID = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));

  // src/state/store.js
  var KEY = "little-city-makers.v1";
  var fresh = () => ({
    v: 1,
    started: false,
    lang: "en",
    mode: "little",
    // 'little' (4–6) | 'junior' (7–10)
    missions: {},
    // missionId -> { plays }
    plots: {},
    // plotId -> { b: buildingId, c?: colorIndex, d?: decoId }
    practice: {},
    // buildingId -> times practised inside the building
    skills: {}
    // skillKey -> activities completed
  });
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s4 = JSON.parse(raw);
        if (s4 && s4.v === 1) return { state: { ...fresh(), ...s4 }, ok: true };
      }
      localStorage.setItem(KEY + ".probe", "1");
      localStorage.removeItem(KEY + ".probe");
      return { state: fresh(), ok: true };
    } catch {
      return { state: fresh(), ok: false };
    }
  }
  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }
  var addSkills = (a, b = {}) => {
    const out = { ...a };
    for (const k in b) out[k] = (out[k] || 0) + b[k];
    return out;
  };
  function reducer(s4, a) {
    switch (a.type) {
      case "START":
        return { ...s4, started: true, lang: a.lang, mode: a.mode };
      case "LANG":
        return { ...s4, lang: a.lang };
      case "MODE":
        return { ...s4, mode: a.mode };
      case "MISSION_DONE":
        return { ...s4, missions: { ...s4.missions, [a.id]: { plays: (s4.missions[a.id]?.plays || 0) + 1 } }, skills: addSkills(s4.skills, a.skills) };
      case "PRACTICE":
        return { ...s4, practice: { ...s4.practice, [a.building]: (s4.practice[a.building] || 0) + 1 }, skills: addSkills(s4.skills, a.skills) };
      case "PLACE": {
        if (s4.plots[a.plot] || placedMap(s4)[a.building]) return s4;
        return { ...s4, plots: { ...s4.plots, [a.plot]: { b: a.building } } };
      }
      case "MOVE": {
        if (s4.plots[a.to] || !s4.plots[a.from]) return s4;
        const plots = { ...s4.plots, [a.to]: s4.plots[a.from] };
        delete plots[a.from];
        return { ...s4, plots };
      }
      case "DECORATE":
        if (!s4.plots[a.plot]) return s4;
        return { ...s4, plots: { ...s4.plots, [a.plot]: { ...s4.plots[a.plot], ...a.patch } } };
      case "RESET":
        return { ...fresh(), lang: s4.lang };
      default:
        return s4;
    }
  }
  var placedMap = (s4) => Object.fromEntries(Object.entries(s4.plots).map(([plot, v2]) => [v2.b, plot]));
  var placedCount = (s4) => Object.keys(s4.plots).length;
  var permitsOf = (s4) => {
    const placed = placedMap(s4);
    return BUILDINGS.filter((b) => s4.missions[b.mission] && !placed[b.id]);
  };
  var missionStatus = (s4, m) => s4.missions[m.id] ? "done" : placedCount(s4) >= m.needs ? "open" : "locked";
  var openMissionCount = (n) => MISSIONS.filter((m) => m.needs <= n).length;
  var levelOf = (n) => n >= TOTAL_BUILDINGS ? 4 : n >= 6 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0;
  function milestones(s4) {
    const d = (id) => !!s4.missions[id];
    const n = placedCount(s4);
    return [
      { id: "first", on: n >= 1 },
      { id: "polite", on: d("m-bakery") },
      { id: "reader", on: d("m-library") },
      { id: "green", on: d("m-park") },
      { id: "kind", on: d("m-toy") && d("m-center") },
      { id: "helper", on: d("m-hospital") },
      { id: "safe", on: d("m-police") },
      { id: "culture", on: d("m-tet") && d("m-chuseok") },
      { id: "town", on: n >= 5 },
      { id: "cityMaker", on: n >= TOTAL_BUILDINGS }
    ];
  }

  // src/components/ui.jsx
  var PATHS = {
    back: "M15 5l-7 7 7 7",
    close: "M6 6l12 12M18 6L6 18",
    speaker: "M4 10v4h4l5 4V6L8 10H4zM16.5 9a4.5 4.5 0 010 6",
    lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
    check: "M5 12.5l4.5 4.5L19 7.5",
    star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z",
    hammer: "M13 4l7 7-2.5 2.5-2.2-2.2L7 19.6 4.4 17l8.3-8.3-2.2-2.2z",
    flag: "M6 21V4M6 5h11l-2.5 4 2.5 4H6",
    trophy: "M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7",
    people: "M9 11a3 3 0 100-6 3 3 0 000 6zM3.5 19a5.5 5.5 0 0111 0M16 11a2.5 2.5 0 100-5M17 14.3a5 5 0 013.5 4.7",
    city: "M4 20V10l5-4 5 4v10M14 20V8h6v12M3 20h18M8 20v-5h2v5",
    move: "M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3",
    brush: "M5 19c2.5 0 4-1 4-3l9-9-3-3-9 9c-2 0-1 3-1 6z",
    play: "M8 5l11 7-11 7z",
    mic: "M12 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v3",
    next: "M9 5l7 7-7 7"
  };
  function Icon({ name, size = 22 }) {
    return /* @__PURE__ */ react_default.createElement("svg", { className: "icon", viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ react_default.createElement("path", { d: PATHS[name] }));
  }
  var canSpeak = typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
  function speak(text) {
    if (!canSpeak || !text) return;
    try {
      const clean = String(text).replace(/[^\p{L}\p{N}\p{P}\s]/gu, "").replace(/_+/g, " ");
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = "en-US";
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
    }
  }
  function Listen({ text, label, big }) {
    if (!canSpeak) return null;
    return /* @__PURE__ */ react_default.createElement("button", { type: "button", className: big ? "listen big" : "listen", onClick: () => speak(text), "aria-label": `${label}: ${text}` }, /* @__PURE__ */ react_default.createElement(Icon, { name: "speaker", size: big ? 28 : 20 }), big && /* @__PURE__ */ react_default.createElement("span", null, label));
  }
  function Modal({ title, onClose, closeLabel, children, wide }) {
    useEffect(() => {
      const onKey = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return /* @__PURE__ */ react_default.createElement("div", { className: "veil", onClick: (e) => e.target === e.currentTarget && onClose() }, /* @__PURE__ */ react_default.createElement("div", { className: wide ? "modal wide" : "modal", role: "dialog", "aria-modal": "true", "aria-label": title }, /* @__PURE__ */ react_default.createElement("header", { className: "modal-head" }, /* @__PURE__ */ react_default.createElement("h2", null, title), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "round", onClick: onClose, "aria-label": closeLabel }, /* @__PURE__ */ react_default.createElement(Icon, { name: "close" }))), children));
  }
  function TopBar({ title, onBack, backLabel, children }) {
    return /* @__PURE__ */ react_default.createElement("header", { className: "topbar" }, onBack && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn small", onClick: onBack }, /* @__PURE__ */ react_default.createElement(Icon, { name: "back", size: 18 }), backLabel), /* @__PURE__ */ react_default.createElement("h1", null, title), /* @__PURE__ */ react_default.createElement("div", { className: "topbar-right" }, children));
  }
  function Meter({ value, max, label }) {
    const pct = max ? Math.min(100, Math.round(value / max * 100)) : 0;
    return /* @__PURE__ */ react_default.createElement("div", { className: "meter", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": max, "aria-valuenow": value, "aria-label": label }, /* @__PURE__ */ react_default.createElement("i", { style: { width: `${pct}%` } }));
  }
  function LangSelect({ lang, onChange, label }) {
    return /* @__PURE__ */ react_default.createElement("label", { className: "langsel" }, /* @__PURE__ */ react_default.createElement("span", { className: "sr" }, label), /* @__PURE__ */ react_default.createElement("select", { id: "lang-select", value: lang, onChange: (e) => onChange(e.target.value) }, LANGS.map((l) => /* @__PURE__ */ react_default.createElement("option", { key: l.id, value: l.id }, l.label))));
  }
  var shuffle = (list) => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // src/art/iso.js
  var A = 60;
  var B = 30;
  var P = (x, y, z = 0) => [(x - y) * A, (x + y) * B - z];
  var pts = (list) => list.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  var quad = (x0, y0, x1, y1, z = 0) => pts([P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)]);
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const c = [n >> 16, n >> 8 & 255, n & 255];
    const target = amt < 0 ? [59, 58, 74] : [255, 255, 255];
    const k = Math.abs(amt);
    return "#" + c.map((v2, i) => Math.round(v2 + (target[i] - v2) * k).toString(16).padStart(2, "0")).join("");
  }

  // src/art/BuildingArt.jsx
  var COLORS = ["#FFE08A", "#FF9B85", "#8FD0F5", "#9FE0C2", "#C6B5F2", "#FFFDF8"];
  var TILE = 1.1;
  var WIN = "#DDF3FF";
  var TRIM = "#FFFDF8";
  var DOOR = "#7A5C4F";
  var ROOF_CORAL = "#F08A72";
  function Box({ f, z = 0, h: h2, c }) {
    const [x0, y0, x1, y1] = f;
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y1, z), P(x1, y1, z), P(x1, y1, z + h2), P(x0, y1, z + h2)]), fill: c }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x1, y1, z), P(x1, y0, z), P(x1, y0, z + h2), P(x1, y1, z + h2)]), fill: shade(c, -0.14) }), /* @__PURE__ */ react_default.createElement("polygon", { points: quad(x0, y0, x1, y1, z + h2), fill: shade(c, 0.3) }));
  }
  function Face({ side, f, z = 0, children }) {
    const [x0, , x1, y1] = f;
    const [e, g] = side === "L" ? P(x0, y1, z) : P(x1, y1, z);
    const b = side === "L" ? B / 100 : -B / 100;
    return /* @__PURE__ */ react_default.createElement("g", { transform: `matrix(${A / 100} ${b} 0 -1 ${e} ${g})` }, children);
  }
  var Win = ({ u, v: v2 = 14, w = 13, h: h2 = 14 }) => /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("rect", { x: u - 1.5, y: v2 - 1.5, width: w + 3, height: h2 + 3, rx: "2", fill: TRIM }), /* @__PURE__ */ react_default.createElement("rect", { x: u, y: v2, width: w, height: h2, rx: "1", fill: WIN }));
  var Door = ({ u, w = 14, h: h2 = 22, c = DOOR }) => /* @__PURE__ */ react_default.createElement("rect", { x: u, y: "0", width: w, height: h2, rx: "3", fill: c });
  function Gable({ f, z, r, c, wall }) {
    const o = 0.04;
    const [x0, y0, x1, y1] = [f[0] - o, f[1] - o, f[2] + o, f[3] + o];
    const ym = (y0 + y1) / 2;
    const R0 = P(x0, ym, z + r);
    const R1 = P(x1, ym, z + r);
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y0, z), P(x1, y0, z), R1, R0]), fill: shade(c, -0.25) }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x1, y1, z), P(x1, y0, z), R1]), fill: shade(wall, -0.14) }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y1, z), P(x1, y1, z), R1, R0]), fill: c }));
  }
  function Hip({ f, z, r, c }) {
    const o = 0.04;
    const [x0, y0, x1, y1] = [f[0] - o, f[1] - o, f[2] + o, f[3] + o];
    const C = P((x0 + x1) / 2, (y0 + y1) / 2, z + r);
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y0, z), P(x1, y0, z), C]), fill: shade(c, -0.3) }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y0, z), P(x0, y1, z), C]), fill: shade(c, -0.3) }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x1, y1, z), P(x1, y0, z), C]), fill: shade(c, -0.14) }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(x0, y1, z), P(x1, y1, z), C]), fill: c }));
  }
  function Sign({ at, e }) {
    const [x, y] = P(at[0], at[1], at[2]);
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("rect", { x: x - 1, y: y - 16, width: "2", height: "16", fill: "#8A8799" }), /* @__PURE__ */ react_default.createElement("circle", { cx: x, cy: y - 27, r: "12.5", fill: TRIM, stroke: "#3B3A4A", strokeWidth: "1.5" }), /* @__PURE__ */ react_default.createElement("text", { x, y: y - 26, fontSize: "13", textAnchor: "middle", dominantBaseline: "central" }, e));
  }
  function Tree({ x, y, s: s4 = 1 }) {
    const [sx, sy] = P(x, y);
    return /* @__PURE__ */ react_default.createElement("g", { transform: `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${s4})` }, /* @__PURE__ */ react_default.createElement("ellipse", { cx: "0", cy: "1", rx: "9", ry: "4", fill: "#3B3A4A", opacity: ".12" }), /* @__PURE__ */ react_default.createElement("rect", { x: "-2", y: "-12", width: "4", height: "13", rx: "2", fill: "#B98A62" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "0", cy: "-22", r: "13", fill: "#6FC59A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "-4", cy: "-26", r: "6", fill: "#8BD6AE" }));
  }
  var ART = {
    home: (c) => {
      const f = [0.25, 0.25, 0.85, 0.85];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 40, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 38 }), /* @__PURE__ */ react_default.createElement(Win, { u: 10 })), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement(Win, { u: 23 })), /* @__PURE__ */ react_default.createElement(Box, { f: [0.33, 0.33, 0.45, 0.45], z: 40, h: 38, c: "#E8B4A0" }), /* @__PURE__ */ react_default.createElement(Gable, { f, z: 40, r: 28, c: ROOF_CORAL, wall: c }));
    },
    bakery: (c) => {
      const f = [0.2, 0.25, 0.9, 0.85];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 42, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 50 }), /* @__PURE__ */ react_default.createElement("rect", { x: "8", y: "5", width: "34", height: "18", rx: "2", fill: TRIM }), /* @__PURE__ */ react_default.createElement("rect", { x: "10", y: "7", width: "30", height: "14", fill: WIN }), [0, 1, 2, 3, 4, 5, 6].map((k) => /* @__PURE__ */ react_default.createElement("rect", { key: k, x: k * 10, y: "27", width: "10", height: "9", fill: k % 2 ? TRIM : ROOF_CORAL }))), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement(Win, { u: 23, v: 12 })), /* @__PURE__ */ react_default.createElement(Box, { f: [0.3, 0.35, 0.8, 0.75], z: 42, h: 5, c: shade(c, 0.35) }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.9, 0.85, 42], e: "\u{1F950}" }));
    },
    library: (c) => {
      const f = [0.15, 0.2, 0.95, 0.9];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f: [0.1, 0.15, 1, 0.95], h: 5, c: "#EFE7D6" }), /* @__PURE__ */ react_default.createElement(Box, { f, z: 5, h: 44, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f, z: 5 }, /* @__PURE__ */ react_default.createElement(Door, { u: 33, h: 26 }), [8, 22, 52, 66].map((u) => /* @__PURE__ */ react_default.createElement("rect", { key: u, x: u, y: "0", width: "6", height: "40", rx: "1", fill: TRIM }))), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f, z: 5 }, /* @__PURE__ */ react_default.createElement(Win, { u: 12, v: 12, h: 22 }), /* @__PURE__ */ react_default.createElement(Win, { u: 44, v: 12, h: 22 })), /* @__PURE__ */ react_default.createElement(Hip, { f, z: 49, r: 26, c: "#9A86D6" }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.95, 0.9, 49], e: "\u{1F4DA}" }));
    },
    toyshop: (c) => {
      const f = [0.22, 0.25, 0.88, 0.85];
      const [bx, by] = P(0.55, 0.55, 40);
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 40, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 44, c: "#D9573F" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "20", cy: "20", r: "12", fill: TRIM }), /* @__PURE__ */ react_default.createElement("circle", { cx: "20", cy: "20", r: "9", fill: WIN })), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement(Win, { u: 23, v: 12 })), /* @__PURE__ */ react_default.createElement(Box, { f: [0.32, 0.35, 0.78, 0.75], z: 40, h: 5, c: shade(c, 0.35) }), /* @__PURE__ */ react_default.createElement("circle", { cx: bx, cy: by - 16, r: "13", fill: "#FF9B85" }), /* @__PURE__ */ react_default.createElement("path", { d: `M${bx - 13} ${by - 16}a13 5 0 0 0 26 0`, fill: "none", stroke: TRIM, strokeWidth: "3" }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.88, 0.85, 40], e: "\u{1F9F8}" }));
    },
    hospital: (c) => {
      const f = [0.2, 0.2, 0.9, 0.9];
      const top = [0.38, 0.38, 0.72, 0.72];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 68, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 27, w: 16, c: "#6FB7E3" }), [30, 48].map((v2) => [8, 28.5, 49].map((u) => /* @__PURE__ */ react_default.createElement(Win, { key: `${u}-${v2}`, u, v: v2, h: 12 })))), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, [12, 30, 48].map((v2) => [12, 44].map((u) => /* @__PURE__ */ react_default.createElement(Win, { key: `${u}-${v2}`, u, v: v2, h: 12 })))), /* @__PURE__ */ react_default.createElement(Box, { f: top, z: 68, h: 18, c: "#FFFDF8" }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f: top, z: 68 }, /* @__PURE__ */ react_default.createElement("rect", { x: "14", y: "2", width: "6", height: "14", fill: "#F0715A" }), /* @__PURE__ */ react_default.createElement("rect", { x: "10", y: "6", width: "14", height: "6", fill: "#F0715A" })));
    },
    police: (c) => {
      const f = [0.2, 0.25, 0.9, 0.85];
      const [lx, ly] = P(0.375, 0.425, 66);
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 44, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement("rect", { x: "0", y: "33", width: "70", height: "5", fill: TRIM }), /* @__PURE__ */ react_default.createElement(Door, { u: 28, c: "#3F5F92" }), /* @__PURE__ */ react_default.createElement(Win, { u: 8, v: 12 }), /* @__PURE__ */ react_default.createElement(Win, { u: 50, v: 12 })), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement("rect", { x: "0", y: "33", width: "60", height: "5", fill: TRIM }), /* @__PURE__ */ react_default.createElement(Win, { u: 23, v: 12 })), /* @__PURE__ */ react_default.createElement(Box, { f: [0.25, 0.3, 0.5, 0.55], z: 44, h: 22, c }), /* @__PURE__ */ react_default.createElement("circle", { cx: lx, cy: ly - 5, r: "6", fill: "#6FB7E3" }), /* @__PURE__ */ react_default.createElement("circle", { cx: lx - 2, cy: ly - 7, r: "2", fill: TRIM }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.9, 0.85, 44], e: "\u2B50" }));
    },
    center: (c) => {
      const f = [0.18, 0.22, 0.92, 0.88];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 42, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 28, w: 18, c: "#3E9B78" }), /* @__PURE__ */ react_default.createElement(Win, { u: 6 }), /* @__PURE__ */ react_default.createElement(Win, { u: 55 })), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement(Win, { u: 10 }), /* @__PURE__ */ react_default.createElement(Win, { u: 42 })), /* @__PURE__ */ react_default.createElement(Gable, { f, z: 42, r: 28, c: "#5FBF98", wall: c }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.92, 0.88, 42], e: "\u{1F91D}" }));
    },
    culture: (c) => {
      const f = [0.15, 0.2, 0.95, 0.9];
      const f2 = [0.3, 0.33, 0.8, 0.8];
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Box, { f, h: 28, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f }, /* @__PURE__ */ react_default.createElement(Door, { u: 33, h: 20, c: "#6E5BB5" }), /* @__PURE__ */ react_default.createElement(Win, { u: 8, v: 9, h: 12 }), /* @__PURE__ */ react_default.createElement(Win, { u: 59, v: 9, h: 12 })), /* @__PURE__ */ react_default.createElement(Face, { side: "R", f }, /* @__PURE__ */ react_default.createElement(Win, { u: 12, v: 9, h: 12 }), /* @__PURE__ */ react_default.createElement(Win, { u: 44, v: 9, h: 12 })), /* @__PURE__ */ react_default.createElement(Box, { f: [0.11, 0.16, 0.99, 0.94], z: 28, h: 4, c: ROOF_CORAL }), /* @__PURE__ */ react_default.createElement(Box, { f: f2, z: 32, h: 24, c }), /* @__PURE__ */ react_default.createElement(Face, { side: "L", f: f2, z: 32 }, [6, 20.5, 35].map((u) => /* @__PURE__ */ react_default.createElement(Win, { key: u, u, v: 6, w: 9, h: 12 }))), /* @__PURE__ */ react_default.createElement(Hip, { f: f2, z: 56, r: 22, c: ROOF_CORAL }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.95, 0.9, 32], e: "\u{1F30F}" }));
    },
    park: (c) => {
      const [px, py] = P(0.62, 0.6);
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("polygon", { points: quad(0.07, 0.07, 1.03, 1.03), fill: "#A9DFBB" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: px, cy: py, rx: "24", ry: "12", fill: "#8FD0F5" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: px - 6, cy: py - 3, rx: "8", ry: "3", fill: "#DDF3FF" }), /* @__PURE__ */ react_default.createElement(Tree, { x: 0.22, y: 0.25 }), /* @__PURE__ */ react_default.createElement(Tree, { x: 0.85, y: 0.2, s: 0.85 }), /* @__PURE__ */ react_default.createElement(Tree, { x: 0.2, y: 0.85, s: 0.9 }), [[0.45, 0.2], [0.55, 0.95], [0.95, 0.55], [0.4, 0.9]].map(([x, y], k) => {
        const [sx, sy] = P(x, y);
        return /* @__PURE__ */ react_default.createElement("g", { key: k }, /* @__PURE__ */ react_default.createElement("circle", { cx: sx, cy: sy - 3, r: "3.4", fill: c }), /* @__PURE__ */ react_default.createElement("circle", { cx: sx, cy: sy - 3, r: "1.2", fill: "#F4BE3C" }));
      }), /* @__PURE__ */ react_default.createElement(Box, { f: [0.78, 0.9, 0.98, 0.97], h: 6, c: "#C99A6B" }));
    },
    plaza: (c) => {
      const [cx, cy] = P(0.5, 0.5);
      return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("polygon", { points: quad(0.06, 0.06, 1.04, 1.04), fill: "#FFF1C9" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx, cy, rx: "32", ry: "16", fill: "#FFD9CE" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx, cy: cy - 3, rx: "19", ry: "9.5", fill: TRIM }), /* @__PURE__ */ react_default.createElement(Box, { f: [0.12, 0.92, 0.22, 1.02], h: 44, c }), /* @__PURE__ */ react_default.createElement(Box, { f: [0.88, 0.92, 0.98, 1.02], h: 44, c }), /* @__PURE__ */ react_default.createElement(Box, { f: [0.1, 0.92, 1, 1.02], z: 44, h: 8, c }), [0.34, 0.55, 0.76].map((x, k) => {
        const [sx, sy] = P(x, 1.02, 44);
        return /* @__PURE__ */ react_default.createElement("g", { key: k }, /* @__PURE__ */ react_default.createElement("rect", { x: sx - 0.6, y: sy, width: "1.2", height: "7", fill: "#8A8799" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: sx, cy: sy + 12, rx: "4.5", ry: "5.5", fill: k === 1 ? "#F4BE3C" : "#F0715A" }));
      }), /* @__PURE__ */ react_default.createElement(Sign, { at: [0.55, 0.97, 52], e: "\u{1F38A}" }));
    }
  };
  function Deco({ d }) {
    if (d === "flowers") {
      return /* @__PURE__ */ react_default.createElement("g", null, [0.14, 0.3, 0.46, 0.62, 0.78, 0.94].map((x, k) => {
        const [sx, sy] = P(x, 1.05);
        return /* @__PURE__ */ react_default.createElement("g", { key: k }, /* @__PURE__ */ react_default.createElement("rect", { x: sx - 0.6, y: sy - 2, width: "1.2", height: "4", fill: "#5FBF98" }), /* @__PURE__ */ react_default.createElement("circle", { cx: sx, cy: sy - 4, r: "3.4", fill: ["#FF9B85", "#FFE08A", "#C6B5F2"][k % 3] }), /* @__PURE__ */ react_default.createElement("circle", { cx: sx, cy: sy - 4, r: "1.2", fill: TRIM }));
      }));
    }
    if (d === "flag") {
      const [sx, sy] = P(0.08, 1.02);
      return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("rect", { x: sx - 1, y: sy - 54, width: "2", height: "54", fill: "#8A8799" }), /* @__PURE__ */ react_default.createElement("polygon", { points: `${sx + 1},${sy - 54} ${sx + 21},${sy - 47} ${sx + 1},${sy - 40}`, fill: "#C6B5F2" }), /* @__PURE__ */ react_default.createElement("circle", { cx: sx, cy: sy - 55, r: "2.5", fill: "#F4BE3C" }));
    }
    if (d === "lights") {
      const a = P(0.04, 1.05);
      const b = P(1.06, 1.05);
      const at = (t) => [a[0] + (b[0] - a[0]) * t, a[1] - 30 + (b[1] - a[1]) * t + 36 * t * (1 - t)];
      const mid = at(0.5);
      return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("rect", { x: a[0] - 1, y: a[1] - 30, width: "2", height: "30", fill: "#8A8799" }), /* @__PURE__ */ react_default.createElement("rect", { x: b[0] - 1, y: b[1] - 30, width: "2", height: "30", fill: "#8A8799" }), /* @__PURE__ */ react_default.createElement("path", { d: `M${a[0]} ${a[1] - 30}Q${mid[0]} ${mid[1] + 9} ${b[0]} ${b[1] - 30}`, fill: "none", stroke: "#6B697D", strokeWidth: "1" }), [0.14, 0.28, 0.42, 0.58, 0.72, 0.86].map((t, k) => {
        const [x, y] = at(t);
        return /* @__PURE__ */ react_default.createElement("circle", { key: k, cx: x, cy: y + 1, r: "3", fill: ["#FFE08A", "#FF9B85", "#8FD0F5"][k % 3] });
      }));
    }
    return null;
  }
  function BuildingArt({ id, color, defaultColor = 0, deco, pop }) {
    const draw = ART[id];
    if (!draw) return null;
    const c = COLORS[color ?? defaultColor] ?? COLORS[0];
    return /* @__PURE__ */ react_default.createElement("g", { className: pop ? "art pop" : "art" }, draw(c), /* @__PURE__ */ react_default.createElement(Deco, { d: deco }));
  }
  function PlotTile({ fill = "#BDE7C8", className }) {
    return /* @__PURE__ */ react_default.createElement("polygon", { className, points: quad(0, 0, TILE, TILE), fill });
  }
  function BuildingThumb({ id, color, defaultColor, deco, size = 96, locked, title }) {
    return /* @__PURE__ */ react_default.createElement("svg", { className: locked ? "thumb locked" : "thumb", viewBox: "-74 -100 148 176", width: size, height: size * 1.19, role: "img", "aria-label": title || id }, /* @__PURE__ */ react_default.createElement(PlotTile, { fill: "#D9F0DF" }), /* @__PURE__ */ react_default.createElement(BuildingArt, { id, color, defaultColor, deco }));
  }

  // src/art/Characters.jsx
  var KIDS = {
    mai: { name: "Mai", skin: "#F5D0AE", hair: "#2E2A33", style: "bob", shirt: "#FF9B85", loves: "painting" },
    joon: { name: "Joon", skin: "#F1C8A2", hair: "#2E2A33", style: "short", shirt: "#8FD0F5", loves: "football" },
    leo: { name: "Leo", skin: "#E7B58E", hair: "#8A5A3C", style: "curls", shirt: "#9FE0C2", loves: "robots" },
    amara: { name: "Amara", skin: "#8D5A3B", hair: "#2B2026", style: "puffs", shirt: "#FFE08A", loves: "building things" },
    sofia: { name: "Sofia", skin: "#DDA57C", hair: "#A6542E", style: "pony", shirt: "#C6B5F2", loves: "gardening" }
  };
  var CAP = "M20 33c0-12 9-19 20-19s20 7 20 19c-6-5-13-7-20-7s-14 2-20 7z";
  function Hair({ style, c }) {
    switch (style) {
      case "bob":
        return /* @__PURE__ */ react_default.createElement("path", { d: "M17 40c0-17 10-27 23-27s23 10 23 27v9h-7V34c-7-1-12-4-16-9-4 5-9 8-16 9v15h-7z", fill: c });
      case "curls":
        return /* @__PURE__ */ react_default.createElement("g", { fill: c }, [[22, 28], [26, 20], [34, 15], [43, 14], [52, 18], [58, 26]].map(([x, y]) => /* @__PURE__ */ react_default.createElement("circle", { key: x, cx: x, cy: y, r: "7.5" })));
      case "puffs":
        return /* @__PURE__ */ react_default.createElement("g", { fill: c }, /* @__PURE__ */ react_default.createElement("circle", { cx: "17", cy: "21", r: "10" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "63", cy: "21", r: "10" }), /* @__PURE__ */ react_default.createElement("path", { d: CAP }));
      case "pony":
        return /* @__PURE__ */ react_default.createElement("g", { fill: c }, /* @__PURE__ */ react_default.createElement("path", { d: "M57 24c11 2 14 15 9 27-3-7-6-11-11-13z" }), /* @__PURE__ */ react_default.createElement("path", { d: CAP }));
      default:
        return /* @__PURE__ */ react_default.createElement("path", { d: CAP, fill: c });
    }
  }
  var MOUTH = {
    happy: /* @__PURE__ */ react_default.createElement("path", { d: "M33 44q7 7 14 0" }),
    sad: /* @__PURE__ */ react_default.createElement("path", { d: "M34 48q6-5 12 0" }),
    calm: /* @__PURE__ */ react_default.createElement("path", { d: "M35 46h10" })
  };
  function Kid({ id, mood = "happy", size = 72 }) {
    const k = KIDS[id];
    if (!k) return null;
    return /* @__PURE__ */ react_default.createElement("svg", { className: "kid", viewBox: "0 0 80 80", width: size, height: size, role: "img", "aria-label": k.name }, /* @__PURE__ */ react_default.createElement("path", { d: "M12 80c0-16 12-23 28-23s28 7 28 23z", fill: k.shirt }), k.style === "bob" && /* @__PURE__ */ react_default.createElement(Hair, { style: "bob", c: k.hair }), /* @__PURE__ */ react_default.createElement("circle", { cx: "40", cy: "36", r: "20", fill: k.skin }), k.style !== "bob" && /* @__PURE__ */ react_default.createElement(Hair, { style: k.style, c: k.hair }), k.style === "bob" && /* @__PURE__ */ react_default.createElement("path", { d: "M21 33c1-11 9-17 19-17s18 6 19 17c-7-1-13-4-17-9-5 5-13 8-21 9z", fill: k.hair }), /* @__PURE__ */ react_default.createElement("circle", { cx: "33", cy: "37", r: "2.4", fill: "#3B3A4A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "47", cy: "37", r: "2.4", fill: "#3B3A4A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "28", cy: "43", r: "3.2", fill: "#FF9B85", opacity: ".45" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "52", cy: "43", r: "3.2", fill: "#FF9B85", opacity: ".45" }), mood === "sad" && /* @__PURE__ */ react_default.createElement("g", { stroke: "#3B3A4A", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ react_default.createElement("path", { d: "M29 32l6-2" }), /* @__PURE__ */ react_default.createElement("path", { d: "M51 32l-6-2" })), /* @__PURE__ */ react_default.createElement("g", { fill: "none", stroke: "#3B3A4A", strokeWidth: "2.4", strokeLinecap: "round" }, MOUTH[mood] || MOUTH.happy));
  }
  function Pip({ size = 64 }) {
    return /* @__PURE__ */ react_default.createElement("svg", { className: "pip", viewBox: "0 0 80 80", width: size, height: size, role: "img", "aria-label": "Pip" }, /* @__PURE__ */ react_default.createElement("ellipse", { cx: "14", cy: "54", rx: "7", ry: "11", fill: "#7FCDAA" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: "66", cy: "54", rx: "7", ry: "11", fill: "#7FCDAA" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "40", cy: "50", r: "25", fill: "#9FE0C2" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: "40", cy: "59", rx: "14", ry: "13", fill: "#FFFDF8" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "31", cy: "44", r: "3", fill: "#3B3A4A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "49", cy: "44", r: "3", fill: "#3B3A4A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "32", cy: "43", r: "1", fill: "#FFFDF8" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "50", cy: "43", r: "1", fill: "#FFFDF8" }), /* @__PURE__ */ react_default.createElement("path", { d: "M35 49h10l-5 6z", fill: "#F7A54A" }), /* @__PURE__ */ react_default.createElement("path", { d: "M19 33c0-13 9-21 21-21s21 8 21 21z", fill: "#FFD45E" }), /* @__PURE__ */ react_default.createElement("rect", { x: "37", y: "10", width: "6", height: "16", rx: "3", fill: "#F4BE3C" }), /* @__PURE__ */ react_default.createElement("rect", { x: "14", y: "30", width: "52", height: "6", rx: "3", fill: "#F4BE3C" }));
  }

  // src/art/CityMap.jsx
  var XW = 6.4;
  var YW = 4.9;
  var M = 0.5;
  var ROAD = 0.4;
  var STEP = 1.5;
  var TINT = { home: "#FBEBB0", learn: "#CDE9F8", community: "#FFD6CB", shop: "#FFE4BF", culture: "#DED4F7", green: "#BDE7C8" };
  var plotXY = (p) => [ROAD + p.i * STEP, ROAD + p.j * STEP];
  var ORDER = [...PLOTS].sort((a, b) => a.i + a.j - (b.i + b.j) || a.i - b.i);
  var reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  function Land() {
    const dash = { stroke: "#E4D3AC", strokeWidth: 2, strokeDasharray: "8 8", strokeLinecap: "round" };
    const line = (a, b, key) => /* @__PURE__ */ react_default.createElement("line", { key, x1: a[0], y1: a[1], x2: b[0], y2: b[1], ...dash });
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(-M, YW + M), P(XW + M, YW + M), P(XW + M, YW + M, -16), P(-M, YW + M, -16)]), fill: "#86CBA4" }), /* @__PURE__ */ react_default.createElement("polygon", { points: pts([P(XW + M, YW + M), P(XW + M, -M), P(XW + M, -M, -16), P(XW + M, YW + M, -16)]), fill: "#74BD95" }), /* @__PURE__ */ react_default.createElement("polygon", { points: quad(-M, -M, XW + M, YW + M), fill: "#BDE7C8" }), /* @__PURE__ */ react_default.createElement("polygon", { points: quad(0, 0, XW, YW), fill: "#FBF0D9" }), [0, 1, 2, 3].map((k) => line(P(0.15, k * STEP + 0.2), P(XW - 0.15, k * STEP + 0.2), `h${k}`)), [0, 1, 2, 3, 4].map((k) => line(P(k * STEP + 0.2, 0.15), P(k * STEP + 0.2, YW - 0.15), `v${k}`)));
  }
  function Mover({ path: path2, dur, begin, at, children }) {
    if (reduceMotion) return /* @__PURE__ */ react_default.createElement("g", { transform: `translate(${at[0]} ${at[1]})` }, children);
    return /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("animateMotion", { dur, begin, repeatCount: "indefinite", path: path2 }), children);
  }
  var Walker = ({ kid }) => /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("ellipse", { cx: "0", cy: "1", rx: "5", ry: "2", fill: "#3B3A4A", opacity: ".15" }), /* @__PURE__ */ react_default.createElement("rect", { x: "-3.5", y: "-12", width: "7", height: "11", rx: "3.5", fill: kid.shirt }), /* @__PURE__ */ react_default.createElement("circle", { cx: "0", cy: "-16", r: "5", fill: kid.skin }), /* @__PURE__ */ react_default.createElement("path", { d: "M-5 -17a5 5 0 0110 0z", fill: kid.hair }));
  var Car = () => /* @__PURE__ */ react_default.createElement("g", null, /* @__PURE__ */ react_default.createElement("ellipse", { cx: "0", cy: "1", rx: "12", ry: "3", fill: "#3B3A4A", opacity: ".15" }), /* @__PURE__ */ react_default.createElement("rect", { x: "-11", y: "-11", width: "22", height: "9", rx: "4", fill: "#FF9B85" }), /* @__PURE__ */ react_default.createElement("rect", { x: "-6", y: "-16", width: "12", height: "7", rx: "3", fill: "#FFC2B4" }), /* @__PURE__ */ react_default.createElement("rect", { x: "-4", y: "-14.5", width: "8", height: "4", rx: "1.5", fill: "#DDF3FF" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "-6", cy: "-2", r: "2.6", fill: "#3B3A4A" }), /* @__PURE__ */ react_default.createElement("circle", { cx: "6", cy: "-2", r: "2.6", fill: "#3B3A4A" }));
  var path = (list) => "M" + list.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L");
  function BackScenery({ n }) {
    const trees = [[0.6, -0.25, 1], [5.6, -0.25, 0.9], [-0.25, 2.4, 1]];
    if (n >= 3) trees.push([2.2, -0.25, 0.85], [-0.25, 0.8, 0.9], [3.9, -0.25, 1.05]);
    if (n >= 6) trees.push([-0.25, 4, 0.95], [1.4, -0.28, 0.7], [4.8, -0.25, 0.8]);
    const a = P(0.2, YW - 0.2), b = P(0.2, 0.2), c = P(XW - 0.2, 0.2);
    return /* @__PURE__ */ react_default.createElement("g", null, trees.map(([x, y, s4], k) => /* @__PURE__ */ react_default.createElement(Tree, { key: k, x, y, s: s4 })), n >= 5 && /* @__PURE__ */ react_default.createElement(Mover, { path: path([a, b, c, b, a]), dur: "26s", begin: "0s", at: b }, /* @__PURE__ */ react_default.createElement(Car, null)));
  }
  function FrontLife({ n }) {
    const a = P(0.3, YW - 0.2), b = P(XW - 0.2, YW - 0.2), c = P(XW - 0.2, 0.3);
    const route = path([a, b, c, b, a]);
    const kids = [n >= 2 && KIDS.mai, n >= 4 && KIDS.leo, n >= 7 && KIDS.amara, n >= 9 && KIDS.joon].filter(Boolean);
    const bushes = [];
    if (n >= 1) bushes.push([1.2, YW + 0.25, 0.8], [XW + 0.25, 3.6, 0.85]);
    if (n >= 4) bushes.push([4.6, YW + 0.25, 0.95], [XW + 0.25, 1.2, 0.75]);
    if (n >= 8) bushes.push([3, YW + 0.28, 0.7], [XW + 0.25, 2.5, 0.9], [6, YW + 0.2, 0.8]);
    return /* @__PURE__ */ react_default.createElement("g", null, kids.map((kid, k) => /* @__PURE__ */ react_default.createElement(Mover, { key: kid.name, path: route, dur: "48s", begin: `${-k * 11}s`, at: P(1 + k * 1.4, YW - 0.2) }, /* @__PURE__ */ react_default.createElement(Walker, { kid }))), bushes.map(([x, y, s4], k) => /* @__PURE__ */ react_default.createElement(Tree, { key: k, x, y, s: s4 })), n >= 10 && /* @__PURE__ */ react_default.createElement("g", { className: "balloons" }, [[-250, -70, "#FF9B85"], [330, -90, "#C6B5F2"], [60, -118, "#FFE08A"]].map(([x, y, c2], k) => /* @__PURE__ */ react_default.createElement("g", { key: k, style: { animationDelay: `${k * 0.7}s` } }, /* @__PURE__ */ react_default.createElement("path", { d: `M${x} ${y + 15}q4 12 0 24`, fill: "none", stroke: "#8A8799", strokeWidth: "1" }), /* @__PURE__ */ react_default.createElement("ellipse", { cx: x, cy: y, rx: "12", ry: "15", fill: c2 })))));
  }
  function Site() {
    const [cx, cy] = P(0.55, 0.55);
    return /* @__PURE__ */ react_default.createElement("g", { className: "site" }, /* @__PURE__ */ react_default.createElement("polygon", { points: quad(0.12, 0.12, 0.98, 0.98), fill: "#FFE08A", opacity: ".7", stroke: "#F4BE3C", strokeWidth: "2", strokeDasharray: "6 5" }), /* @__PURE__ */ react_default.createElement("text", { className: "hammer", x: cx, y: cy - 16, fontSize: "26", textAnchor: "middle" }, "\u{1F528}"), /* @__PURE__ */ react_default.createElement("rect", { x: cx - 30, y: cy + 2, width: "60", height: "10", rx: "5", fill: "#FFFDF8", stroke: "#3B3A4A", strokeWidth: "1.5" }), /* @__PURE__ */ react_default.createElement("rect", { className: "sitebar", x: cx - 27.5, y: cy + 4.5, width: "55", height: "5", rx: "2.5", fill: "#5FBF98" }));
  }
  function Plus() {
    const [cx, cy] = P(0.55, 0.55);
    return /* @__PURE__ */ react_default.createElement("g", { className: "plus" }, /* @__PURE__ */ react_default.createElement("circle", { cx, cy, r: "11", fill: "#FFFDF8", opacity: ".9" }), /* @__PURE__ */ react_default.createElement("path", { d: `M${cx - 5} ${cy}h10M${cx} ${cy - 5}v10`, stroke: "#6B697D", strokeWidth: "2.5", strokeLinecap: "round" }));
  }
  function CityMap({ plots, onPlot, glow, site, popped, lifted, label, demo, title }) {
    const n = Object.keys(plots).length;
    return /* @__PURE__ */ react_default.createElement("svg", { className: "map", viewBox: "-365 -138 820 540", role: demo ? "img" : "group", "aria-label": title, preserveAspectRatio: "xMidYMid meet" }, /* @__PURE__ */ react_default.createElement("ellipse", { cx: "45", cy: "300", rx: "420", ry: "120", fill: "#3B3A4A", opacity: ".07" }), /* @__PURE__ */ react_default.createElement(Land, null), /* @__PURE__ */ react_default.createElement(BackScenery, { n }), ORDER.map((p) => {
      const [x, y] = plotXY(p);
      const [tx, ty] = P(x, y);
      const cur = plots[p.id];
      const b = cur && BUILDINGS_BY_ID[cur.b];
      const empty = !cur && site !== p.id;
      const cls = ["plot", empty && "empty", empty && glow && "glow", lifted === p.id && "lifted"].filter(Boolean).join(" ");
      const interactive = !demo && onPlot;
      return /* @__PURE__ */ react_default.createElement(
        "g",
        {
          key: p.id,
          className: cls,
          transform: `translate(${tx.toFixed(1)} ${ty.toFixed(1)})`,
          ...interactive ? {
            role: "button",
            tabIndex: 0,
            "aria-label": label ? label(p, b) : p.id,
            onClick: () => onPlot(p.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPlot(p.id);
              }
            }
          } : {}
        },
        /* @__PURE__ */ react_default.createElement(PlotTile, { className: "tile", fill: TINT[p.district] }),
        site === p.id ? /* @__PURE__ */ react_default.createElement(Site, null) : b ? /* @__PURE__ */ react_default.createElement(BuildingArt, { id: b.id, color: cur.c, defaultColor: b.color, deco: cur.d, pop: popped === p.id }) : /* @__PURE__ */ react_default.createElement(Plus, null)
      );
    }), /* @__PURE__ */ react_default.createElement(FrontLife, { n }));
  }

  // src/screens/City.jsx
  var BUILD_MS = 1700;
  function City({ state, dispatch, t, lang, go, initialBuild, onPractice }) {
    const placed = placedMap(state);
    const n = placedCount(state);
    const permits = permitsOf(state);
    const [mode, setMode] = useState(() => initialBuild && !placed[initialBuild] ? { type: "build", b: initialBuild } : null);
    const [site, setSite] = useState(null);
    const [popped, setPopped] = useState(null);
    const [panel, setPanel] = useState(null);
    const [note, setNote] = useState(null);
    const [gate, setGate] = useState(false);
    const timer = useRef(null);
    useEffect(() => () => clearTimeout(timer.current), []);
    const bName = (id) => loc(BUILDINGS_BY_ID[id].name, lang);
    const place = (plotId, bId) => {
      setSite(plotId);
      setNote(t("constructing"));
      const rest = permits.filter((p) => p.id !== bId);
      const opensMore = openMissionCount(n + 1) > openMissionCount(n);
      timer.current = setTimeout(() => {
        dispatch({ type: "PLACE", plot: plotId, building: bId });
        setSite(null);
        setPopped(plotId);
        const b = BUILDINGS_BY_ID[bId];
        const fit = PLOTS_BY_ID[plotId].district === b.cat;
        const msg = fit ? t("g_fit", { b: bName(bId), c: t("c_" + b.cat) }) : t("g_own", { b: bName(bId) });
        setNote(opensMore ? `${msg} ${t("g_newMissions")}` : msg);
        setMode(rest.length ? { type: "build", b: rest[0].id } : null);
      }, BUILD_MS);
    };
    const onPlot = (id) => {
      if (site) return;
      const cur = state.plots[id];
      if (mode?.type === "build") {
        if (cur) setNote(t("g_taken"));
        else if (mode.b) place(id, mode.b);
        else setNote(t("g_noPermit"));
      } else if (mode?.type === "move") {
        if (id === mode.from) {
          setMode(null);
          setNote(null);
        } else if (cur) setNote(t("g_taken"));
        else {
          dispatch({ type: "MOVE", from: mode.from, to: id });
          setPopped(id);
          setNote(t("g_moved", { b: bName(state.plots[mode.from].b) }));
          setMode(null);
        }
      } else if (cur) {
        setPanel(id);
      } else if (permits.length) {
        setMode({ type: "build", b: permits[0].id });
        setNote(null);
      } else {
        setNote(t("g_noPermit"));
      }
    };
    const startBuild = () => {
      setMode({ type: "build", b: permits[0]?.id ?? null });
      setNote(null);
    };
    const stopMode = () => {
      setMode(null);
      setNote(null);
    };
    let guide;
    let cta = null;
    if (mode?.type === "build") guide = mode.b ? t("tapPlot") : permits.length ? t("g_choose") : t("g_noPermit");
    else if (mode?.type === "move") guide = t("g_move", { b: bName(state.plots[mode.from].b) });
    else if (permits.length) {
      guide = t("g_permit");
      cta = { label: t("build"), icon: "hammer", fn: startBuild };
    } else if (n >= TOTAL_BUILDINGS) guide = t("g_done");
    else if (Object.keys(state.missions).length === 0) {
      guide = t("g_first");
      cta = { label: t("letsGo"), icon: "play", fn: () => go("missions") };
    } else {
      guide = t("g_more");
      cta = { label: t("missions"), icon: "flag", fn: () => go("missions") };
    }
    const level = levelOf(n);
    const selected = mode?.type === "build" && mode.b ? BUILDINGS_BY_ID[mode.b] : null;
    const openCount = MISSIONS.filter((m) => missionStatus(state, m) === "open").length;
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen cityscreen" }, /* @__PURE__ */ react_default.createElement("header", { className: "hud" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "brand", onClick: () => go("welcome"), "aria-label": "Little City Makers" }, /* @__PURE__ */ react_default.createElement("span", { className: "brandmark", "aria-hidden": "true" }, /* @__PURE__ */ react_default.createElement("i", null), /* @__PURE__ */ react_default.createElement("i", null), /* @__PURE__ */ react_default.createElement("i", null)), /* @__PURE__ */ react_default.createElement("span", { className: "brandname" }, "Little City Makers")), /* @__PURE__ */ react_default.createElement("div", { className: "levelbox" }, /* @__PURE__ */ react_default.createElement("b", null, t("lv" + level)), /* @__PURE__ */ react_default.createElement(Meter, { value: n, max: TOTAL_BUILDINGS, label: t("cityGrowth") }), /* @__PURE__ */ react_default.createElement("small", null, t("buildingsCount", { n, total: TOTAL_BUILDINGS }))), /* @__PURE__ */ react_default.createElement(LangSelect, { lang, onChange: (l) => dispatch({ type: "LANG", lang: l }), label: t("chooseLang") }), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn small", onClick: () => setGate(true) }, /* @__PURE__ */ react_default.createElement(Icon, { name: "people", size: 18 }), /* @__PURE__ */ react_default.createElement("span", { className: "hide-s" }, t("grownups")))), /* @__PURE__ */ react_default.createElement("div", { className: "mapwrap" }, /* @__PURE__ */ react_default.createElement(
      CityMap,
      {
        plots: state.plots,
        onPlot,
        glow: !!mode && !site,
        site,
        popped,
        lifted: mode?.type === "move" ? mode.from : null,
        title: t("cityMap"),
        label: (p, b) => b ? loc(b.name, lang) : `${t("emptyPlot")}, ${t("c_" + p.district)}`
      }
    ), /* @__PURE__ */ react_default.createElement("div", { className: "guide", role: "status" }, /* @__PURE__ */ react_default.createElement(Pip, { size: 58 }), /* @__PURE__ */ react_default.createElement("div", { className: "bubble" }, /* @__PURE__ */ react_default.createElement("p", null, note || guide), cta && !mode && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn mint small", onClick: cta.fn }, /* @__PURE__ */ react_default.createElement(Icon, { name: cta.icon, size: 18 }), cta.label)))), mode?.type === "build" ? /* @__PURE__ */ react_default.createElement("section", { className: "tray-build", "aria-label": t("inventory") }, /* @__PURE__ */ react_default.createElement("div", { className: "trayhead" }, /* @__PURE__ */ react_default.createElement("h2", null, /* @__PURE__ */ react_default.createElement(Icon, { name: "hammer" }), t("inventory")), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn small", onClick: stopMode, disabled: !!site }, t("done"))), /* @__PURE__ */ react_default.createElement("div", { className: "traybody" }, selected && /* @__PURE__ */ react_default.createElement("div", { className: "preview" }, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: selected.id, defaultColor: selected.color, size: 86, title: loc(selected.name, lang) }), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("h3", { lang: "en" }, selected.name.en), sup(selected.name, lang) && /* @__PURE__ */ react_default.createElement("p", { className: "sup" }, sup(selected.name, lang)), /* @__PURE__ */ react_default.createElement("p", null, t("c_" + selected.cat), " \xB7 ", loc(selected.learn, lang)))), /* @__PURE__ */ react_default.createElement("div", { className: "inventory" }, BUILDINGS.map((b) => {
      const st = placed[b.id] ? "onMap" : state.missions[b.mission] ? "ready" : "locked";
      const inner = /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: b.id, defaultColor: b.color, size: 58, locked: st === "locked", title: loc(b.name, lang) }), /* @__PURE__ */ react_default.createElement("b", null, loc(b.name, lang)), /* @__PURE__ */ react_default.createElement("small", null, st === "locked" && /* @__PURE__ */ react_default.createElement(Icon, { name: "lock", size: 12 }), st === "ready" ? t("ready") : st === "onMap" ? t("onMap") : t("lockedBy", { m: loc(MISSIONS_BY_ID[b.mission].title, lang) })));
      return st === "ready" ? /* @__PURE__ */ react_default.createElement("button", { type: "button", key: b.id, className: mode.b === b.id ? "inv ready sel" : "inv ready", disabled: !!site, "aria-pressed": mode.b === b.id, onClick: () => {
        setMode({ type: "build", b: b.id });
        setNote(null);
      } }, inner) : /* @__PURE__ */ react_default.createElement("div", { key: b.id, className: `inv ${st}` }, inner);
    })))) : mode?.type === "move" ? /* @__PURE__ */ react_default.createElement("nav", { className: "dock" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: stopMode }, t("cancel"))) : /* @__PURE__ */ react_default.createElement("nav", { className: "dock" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn primary big", onClick: () => go("missions") }, /* @__PURE__ */ react_default.createElement(Icon, { name: "flag" }), t("missions"), openCount > 0 && /* @__PURE__ */ react_default.createElement("span", { className: "badge" }, openCount)), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn big", onClick: startBuild }, /* @__PURE__ */ react_default.createElement(Icon, { name: "hammer" }), t("build"), permits.length > 0 && /* @__PURE__ */ react_default.createElement("span", { className: "badge" }, permits.length)), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn big", onClick: () => go("achievements") }, /* @__PURE__ */ react_default.createElement(Icon, { name: "trophy" }), t("myCity"))), panel && state.plots[panel] && /* @__PURE__ */ react_default.createElement(
      BuildingPanel,
      {
        plotId: panel,
        state,
        dispatch,
        t,
        lang,
        onClose: () => setPanel(null),
        onPractice,
        onMove: () => {
          setMode({ type: "move", from: panel });
          setPanel(null);
          setNote(null);
        }
      }
    ), gate && /* @__PURE__ */ react_default.createElement(ParentGate, { t, onClose: () => setGate(false), onPass: () => go("parent") }));
  }
  function BuildingPanel({ plotId, state, dispatch, t, lang, onClose, onPractice, onMove }) {
    const cur = state.plots[plotId];
    const b = BUILDINGS_BY_ID[cur.b];
    const practised = state.practice[b.id] || 0;
    const color = cur.c ?? b.color;
    const deco = cur.d ?? "none";
    const patch = (p) => dispatch({ type: "DECORATE", plot: plotId, patch: p });
    return /* @__PURE__ */ react_default.createElement(Modal, { title: b.name.en, onClose, closeLabel: t("close"), wide: true }, /* @__PURE__ */ react_default.createElement("div", { className: "panel" }, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: b.id, color, deco, size: 150, title: loc(b.name, lang) }), /* @__PURE__ */ react_default.createElement("div", { className: "panelinfo" }, sup(b.name, lang) && /* @__PURE__ */ react_default.createElement("p", { className: "sup" }, sup(b.name, lang)), /* @__PURE__ */ react_default.createElement("h3", null, t("weLearn")), /* @__PURE__ */ react_default.createElement("p", null, loc(b.learn, lang)), /* @__PURE__ */ react_default.createElement("div", { className: "row" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn primary", onClick: () => onPractice(b.id) }, /* @__PURE__ */ react_default.createElement(Icon, { name: "play" }), t("practiceHere")), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: onMove }, /* @__PURE__ */ react_default.createElement(Icon, { name: "move" }), t("move"))))), /* @__PURE__ */ react_default.createElement("section", { className: "decorate" }, /* @__PURE__ */ react_default.createElement("h3", null, /* @__PURE__ */ react_default.createElement(Icon, { name: "brush" }), t("decorate")), /* @__PURE__ */ react_default.createElement("p", { className: "minih" }, t("color")), /* @__PURE__ */ react_default.createElement("div", { className: "swatches" }, COLORS.map((c, k) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: c, className: k === color ? "swatch sel" : "swatch", style: { background: c }, "aria-label": `${t("color")} ${k + 1}`, "aria-pressed": k === color, onClick: () => patch({ c: k }) }))), /* @__PURE__ */ react_default.createElement("p", { className: "minih" }, t("decoration")), /* @__PURE__ */ react_default.createElement("div", { className: "chips" }, DECOS.map((d) => {
      const locked = practised < d.needs;
      return /* @__PURE__ */ react_default.createElement("button", { type: "button", key: d.id, className: d.id === deco ? "chip sel" : "chip", disabled: locked, "aria-pressed": d.id === deco, onClick: () => patch({ d: d.id }) }, locked && /* @__PURE__ */ react_default.createElement(Icon, { name: "lock", size: 14 }), /* @__PURE__ */ react_default.createElement("span", null, t("d_" + d.id)), locked && /* @__PURE__ */ react_default.createElement("small", null, t("practiceToUnlock", { n: d.needs })));
    }))));
  }
  function ParentGate({ t, onClose, onPass }) {
    const [q] = useState(() => ({ a: 3 + Math.floor(Math.random() * 6), b: 3 + Math.floor(Math.random() * 6) }));
    const [val, setVal] = useState("");
    const [wrong, setWrong] = useState(false);
    const submit = (e) => {
      e.preventDefault();
      if (Number(val) === q.a * q.b) onPass();
      else setWrong(true);
    };
    return /* @__PURE__ */ react_default.createElement(Modal, { title: t("grownups"), onClose, closeLabel: t("close") }, /* @__PURE__ */ react_default.createElement("form", { className: "gate", onSubmit: submit }, /* @__PURE__ */ react_default.createElement("label", { htmlFor: "gate-answer" }, t("gateQ", q)), /* @__PURE__ */ react_default.createElement("div", { className: "row" }, /* @__PURE__ */ react_default.createElement("input", { id: "gate-answer", type: "text", inputMode: "numeric", autoComplete: "off", value: val, onChange: (e) => {
      setVal(e.target.value);
      setWrong(false);
    } }), /* @__PURE__ */ react_default.createElement("button", { type: "submit", className: "btn primary" }, t("open"))), wrong && /* @__PURE__ */ react_default.createElement("p", { className: "gentle", role: "alert" }, t("gateWrong"))));
  }

  // src/activities/steps.jsx
  var Sup = ({ text, lang }) => text ? /* @__PURE__ */ react_default.createElement("p", { className: "sup", lang }, text) : null;
  function Prompt({ q, hint, lang, t }) {
    if (!q) return null;
    return /* @__PURE__ */ react_default.createElement("div", { className: "prompt" }, /* @__PURE__ */ react_default.createElement("h2", { lang: "en" }, q), /* @__PURE__ */ react_default.createElement(Listen, { text: q, label: t("listen") }), /* @__PURE__ */ react_default.createElement(Sup, { text: sup(hint, lang), lang }));
  }
  function Pick({ step, mission, lang, t, solved, onSolved }) {
    const opts = useMemo(() => shuffle(step.opts.map((o) => {
      if (Array.isArray(o)) return { e: o[0], l: o[1] };
      const word = mission.vocab.find((x) => x.w === o);
      return word ? { e: word.e, l: word.w, g: word } : { l: o };
    })), [step]);
    const [tried, setTried] = useState([]);
    const pics = opts.every((o) => o.e);
    const tap = (o) => {
      if (solved) return;
      if (o.l === step.a) {
        speak(o.l);
        onSolved();
      } else setTried((x) => [...x, o.l]);
    };
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, step.passage && /* @__PURE__ */ react_default.createElement("div", { className: "passage" }, /* @__PURE__ */ react_default.createElement("p", { lang: "en" }, step.passage), /* @__PURE__ */ react_default.createElement(Listen, { text: step.passage, label: t("listen") })), /* @__PURE__ */ react_default.createElement(Prompt, { q: step.q, hint: step.h, lang, t }), /* @__PURE__ */ react_default.createElement("div", { className: pics ? "opts pics" : "opts lines" }, opts.map((o) => {
      const right = solved && o.l === step.a;
      return /* @__PURE__ */ react_default.createElement("button", { type: "button", key: o.l, className: right ? "opt right" : tried.includes(o.l) ? "opt tried" : "opt", disabled: tried.includes(o.l), onClick: () => tap(o) }, o.e && /* @__PURE__ */ react_default.createElement("span", { className: "emo", "aria-hidden": "true" }, o.e), /* @__PURE__ */ react_default.createElement("span", { className: "lab", lang: "en" }, o.l), right && o.g && /* @__PURE__ */ react_default.createElement(Sup, { text: sup(o.g, lang), lang }));
    })), tried.length > 0 && !solved && /* @__PURE__ */ react_default.createElement("p", { className: "gentle", role: "status" }, t("tryAgain")));
  }
  function Order({ step, lang, t, solved, onSolved }) {
    const words = step.words;
    const full = words.join(step.letters ? "" : " ");
    const [pool] = useState(() => {
      let p = shuffle(words.map((w, i) => ({ w, i })));
      for (let k = 0; k < 5 && p.every((x, i) => x.w === words[i]); k++) p = shuffle(p);
      return p;
    });
    const [picked, setPicked] = useState([]);
    const [bad, setBad] = useState(false);
    const add = (tile) => {
      if (solved || bad || picked.includes(tile)) return;
      const next = [...picked, tile];
      setPicked(next);
      if (next.length < words.length) return;
      if (next.every((x, k) => x.w === words[k])) {
        speak(full);
        onSolved();
        return;
      }
      setBad(true);
      setTimeout(() => {
        let keep = 0;
        while (keep < next.length && next[keep].w === words[keep]) keep++;
        setPicked(next.slice(0, keep));
        setBad(false);
      }, 900);
    };
    const remove = (tile) => !solved && !bad && setPicked((p) => p.filter((x) => x !== tile));
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, step.pic && /* @__PURE__ */ react_default.createElement("div", { className: "bigpic", "aria-hidden": "true" }, step.pic), /* @__PURE__ */ react_default.createElement(Prompt, { q: step.q, hint: step.h, lang, t }), !step.letters && /* @__PURE__ */ react_default.createElement(Listen, { text: full, label: t("listen"), big: true }), /* @__PURE__ */ react_default.createElement("div", { className: `slots${step.letters ? " letters" : ""}${bad ? " bad" : ""}${solved ? " ok" : ""}`, "aria-label": t("yourAnswer"), lang: "en" }, picked.map((tile) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: tile.i, className: "tile", onClick: () => remove(tile) }, tile.w)), picked.length === 0 && /* @__PURE__ */ react_default.createElement("span", { className: "slot-hint" }, "\u2026")), /* @__PURE__ */ react_default.createElement("div", { className: step.letters ? "tiles letters" : "tiles", lang: "en" }, pool.map((tile) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: tile.i, className: "tile", disabled: picked.includes(tile), onClick: () => add(tile) }, tile.w))), bad && /* @__PURE__ */ react_default.createElement("p", { className: "gentle", role: "status" }, t("tryAgain")));
  }
  function TypeIn({ step, t, solved, onSolved }) {
    const [val, setVal] = useState("");
    const [misses, setMisses] = useState(0);
    const submit = (e) => {
      e.preventDefault();
      if (solved || !val.trim()) return;
      if (val.trim().toLowerCase() === step.a.toLowerCase()) {
        speak(`${step.pre} ${step.a} ${step.post}`);
        onSolved();
      } else setMisses((m) => m + 1);
    };
    return /* @__PURE__ */ react_default.createElement("form", { className: "step", onSubmit: submit }, step.pic && /* @__PURE__ */ react_default.createElement("div", { className: "bigpic", "aria-hidden": "true" }, step.pic), /* @__PURE__ */ react_default.createElement("p", { className: "cloze", lang: "en" }, step.pre, " ", /* @__PURE__ */ react_default.createElement(
      "input",
      {
        id: "type-answer",
        type: "text",
        value: solved ? step.a : val,
        onChange: (e) => setVal(e.target.value),
        readOnly: solved,
        autoComplete: "off",
        autoCapitalize: "none",
        spellCheck: "false",
        size: Math.max(6, step.a.length + 1),
        "aria-label": t("yourAnswer"),
        className: solved ? "ok" : ""
      }
    ), step.post.startsWith(",") ? "" : " ", step.post), !solved && /* @__PURE__ */ react_default.createElement("button", { type: "submit", className: "btn mint" }, t("check")), misses > 0 && !solved && /* @__PURE__ */ react_default.createElement("p", { className: "gentle", role: "status" }, t("tryAgain"), " ", t("hint", { x: step.a.slice(0, Math.min(misses, step.a.length - 1)) })));
  }
  function Choice({ step, lang, t, solved, onSolved }) {
    const [seen, setSeen] = useState([]);
    const [cur, setCur] = useState(null);
    const pickOpt = (k) => {
      setCur(k);
      const o2 = step.opts[k];
      speak(o2.out.en);
      if (o2.good) onSolved();
      else setSeen((x) => [...x, k]);
    };
    const o = cur != null ? step.opts[cur] : null;
    const mood = o ? o.good ? "happy" : "sad" : "calm";
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, /* @__PURE__ */ react_default.createElement("div", { className: "cast" }, step.who.map((id) => /* @__PURE__ */ react_default.createElement(Kid, { key: id, id, mood, size: 84 }))), /* @__PURE__ */ react_default.createElement("div", { className: "prompt" }, /* @__PURE__ */ react_default.createElement("h2", { lang: "en" }, step.story.en), /* @__PURE__ */ react_default.createElement(Listen, { text: step.story.en, label: t("listen") }), /* @__PURE__ */ react_default.createElement(Sup, { text: sup(step.story, lang), lang })), o ? /* @__PURE__ */ react_default.createElement("div", { className: o.good ? "outcome good" : "outcome", role: "status" }, /* @__PURE__ */ react_default.createElement("p", { className: "said", lang: "en" }, "\u201C", o.l, "\u201D"), /* @__PURE__ */ react_default.createElement("p", { lang: "en" }, o.out.en), /* @__PURE__ */ react_default.createElement(Sup, { text: sup(o.out, lang), lang }), !o.good && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: () => setCur(null) }, t("tryAnother"))) : /* @__PURE__ */ react_default.createElement("div", { className: "opts lines" }, step.opts.map((opt, k) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: k, className: seen.includes(k) ? "opt tried" : "opt", disabled: seen.includes(k) || solved, onClick: () => pickOpt(k) }, /* @__PURE__ */ react_default.createElement("span", { className: "lab", lang: "en" }, opt.l)))));
  }
  function Sort({ step, lang, t, solved, onSolved }) {
    const [left, setLeft] = useState(() => shuffle(step.items.map((it, i) => ({ ...it, i }))));
    const [sel, setSel] = useState(null);
    const [oops, setOops] = useState(null);
    const [filled, setFilled] = useState({});
    const drag = useRef(null);
    const dragged = useRef(false);
    const drop = (it, binId) => {
      if (it.bin !== binId) {
        setOops(it.i);
        setTimeout(() => setOops(null), 700);
        return;
      }
      const rest = left.filter((x) => x.i !== it.i);
      setLeft(rest);
      setFilled((f) => ({ ...f, [binId]: [...f[binId] || [], it.e] }));
      setSel(null);
      speak(it.l);
      if (!rest.length) onSolved();
    };
    const down = (e, it) => {
      drag.current = { it, x: e.clientX, y: e.clientY, el: e.currentTarget, moved: false };
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
      }
    };
    const move = (e) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (Math.abs(dx) + Math.abs(dy) > 10) d.moved = true;
      if (d.moved) d.el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
    };
    const up = (e) => {
      const d = drag.current;
      if (!d) return;
      drag.current = null;
      d.el.style.transform = "";
      if (!d.moved) return;
      dragged.current = true;
      setTimeout(() => {
        dragged.current = false;
      }, 0);
      d.el.style.pointerEvents = "none";
      const target = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-bin]");
      d.el.style.pointerEvents = "";
      if (target) drop(d.it, target.dataset.bin);
    };
    const tapItem = (it) => {
      if (!dragged.current) setSel((s4) => s4 === it.i ? null : it.i);
    };
    const tapBin = (binId) => {
      const it = left.find((x) => x.i === sel);
      if (it) drop(it, binId);
    };
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, /* @__PURE__ */ react_default.createElement(Prompt, { q: step.q, hint: step.h, lang, t }), /* @__PURE__ */ react_default.createElement("div", { className: "tray" }, left.map((it) => /* @__PURE__ */ react_default.createElement(
      "button",
      {
        type: "button",
        key: it.i,
        className: `thing${sel === it.i ? " sel" : ""}${oops === it.i ? " oops" : ""}`,
        onPointerDown: (e) => down(e, it),
        onPointerMove: move,
        onPointerUp: up,
        onPointerCancel: up,
        onClick: () => tapItem(it)
      },
      /* @__PURE__ */ react_default.createElement("span", { className: "emo", "aria-hidden": "true" }, it.e),
      /* @__PURE__ */ react_default.createElement("span", { className: "lab", lang: "en" }, it.l)
    )), left.length === 0 && /* @__PURE__ */ react_default.createElement("span", { className: "emo", "aria-hidden": "true" }, "\u2728")), /* @__PURE__ */ react_default.createElement("div", { className: "bins" }, step.bins.map((b) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: b.id, "data-bin": b.id, className: sel != null ? "bin ready" : "bin", onClick: () => tapBin(b.id), disabled: solved }, /* @__PURE__ */ react_default.createElement("span", { className: "emo", "aria-hidden": "true" }, b.e), /* @__PURE__ */ react_default.createElement("span", { className: "lab", lang: "en" }, b.l), /* @__PURE__ */ react_default.createElement(Sup, { text: sup(b, lang), lang }), /* @__PURE__ */ react_default.createElement("span", { className: "in", "aria-hidden": "true" }, (filled[b.id] || []).join(" "))))), oops != null && /* @__PURE__ */ react_default.createElement("p", { className: "gentle", role: "status" }, t("tryAgain")));
  }
  function Learn({ step, lang, t, little, onSolved }) {
    const [c, setC] = useState(0);
    const last = step.cards.length - 1;
    const card = step.cards[c];
    useEffect(() => {
      if (little) speak(card.s);
      if (c === last) onSolved();
    }, [c]);
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, /* @__PURE__ */ react_default.createElement("div", { className: "factcard" }, /* @__PURE__ */ react_default.createElement("div", { className: "bigpic", "aria-hidden": "true" }, card.e), /* @__PURE__ */ react_default.createElement("p", { className: "fact", lang: "en" }, card.s), /* @__PURE__ */ react_default.createElement(Listen, { text: card.s, label: t("listen"), big: true }), /* @__PURE__ */ react_default.createElement(Sup, { text: sup(card.h, lang), lang })), /* @__PURE__ */ react_default.createElement("div", { className: "dots", "aria-hidden": "true" }, step.cards.map((_, k) => /* @__PURE__ */ react_default.createElement("i", { key: k, className: k <= c ? "on" : "" }))), c < last && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: () => setC(c + 1) }, t("next"), /* @__PURE__ */ react_default.createElement(Icon, { name: "next", size: 18 })));
  }
  function Say({ step, t, solved, onSolved }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: "step" }, /* @__PURE__ */ react_default.createElement("div", { className: "saybox" }, /* @__PURE__ */ react_default.createElement(Icon, { name: "mic", size: 34 }), /* @__PURE__ */ react_default.createElement("p", { className: "fact", lang: "en" }, "\u201C", step.s, "\u201D"), /* @__PURE__ */ react_default.createElement(Listen, { text: step.s, label: t("listen"), big: true })), !solved && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn mint", onClick: onSolved }, t("iSaidIt")), /* @__PURE__ */ react_default.createElement("p", { className: "fine" }, t("noRecord")));
  }
  var STEPS = { pick: Pick, order: Order, type: TypeIn, choice: Choice, sort: Sort, learn: Learn, say: Say };
  function skillOf(step, mode) {
    switch (step.t) {
      case "pick":
        return step.passage || mode === "junior" ? "reading" : "vocabulary";
      case "order":
      case "type":
        return "writing";
      case "say":
        return "speaking";
      case "sort":
        return "vocabulary";
      case "learn":
        return "listening";
      case "choice":
        return mode === "junior" ? "reading" : "listening";
      default:
        return "vocabulary";
    }
  }
  var spokenPrompt = (step) => step.q || step.story && loc(step.story, "en") || null;

  // src/screens/MissionPlayer.jsx
  var Sup2 = ({ text, lang }) => text ? /* @__PURE__ */ react_default.createElement("p", { className: "sup", lang }, text) : null;
  function MissionPlayer({ mission, building, mode, lang, t, practice, wasDone, placed, practiceBefore, session, onComplete, onExit, onBuild }) {
    const init = useRef({ wasDone, placed, practiceBefore, session }).current;
    const little = mode === "little";
    const steps = useMemo(() => {
      const all = mission.steps[mode];
      if (!practice) return all;
      const say = all.find((s4) => s4.t === "say");
      const pool = shuffle(all.filter((s4) => s4.t !== "learn" && s4.t !== "say")).slice(0, 3);
      return say ? [...pool, say] : pool;
    }, [mission.id, mode, practice]);
    const [phase, setPhase] = useState(practice ? "steps" : "intro");
    const [i, setI] = useState(0);
    const [solved, setSolved] = useState(false);
    const solvedRef = useRef(false);
    const tally = useRef({});
    const praise = useRef(PRAISE[0]);
    const step = steps[i];
    useEffect(() => {
      if (phase === "steps" && little) speak(spokenPrompt(step));
    }, [phase, i]);
    const solve = () => {
      if (solvedRef.current) return;
      solvedRef.current = true;
      const k = skillOf(step, mode);
      tally.current[k] = (tally.current[k] || 0) + 1;
      praise.current = PRAISE[Math.floor(Math.random() * PRAISE.length)];
      setSolved(true);
    };
    const next = () => {
      if (i + 1 < steps.length) {
        solvedRef.current = false;
        setSolved(false);
        setI(i + 1);
        return;
      }
      for (const k of mission.skills) tally.current[k] = (tally.current[k] || 0) + 1;
      onComplete(tally.current);
      setPhase("reward");
    };
    const Step = phase === "steps" ? STEPS[step.t] : null;
    const bName = loc(building.name, lang);
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen play" }, /* @__PURE__ */ react_default.createElement("header", { className: "playbar" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "round", onClick: onExit, "aria-label": t("leave") }, /* @__PURE__ */ react_default.createElement(Icon, { name: "close" })), phase === "steps" ? /* @__PURE__ */ react_default.createElement("div", { className: "stepdots", role: "img", "aria-label": t("stepOf", { n: i + 1, total: steps.length }) }, steps.map((_, k) => /* @__PURE__ */ react_default.createElement("i", { key: k, className: k < i || k === i && solved ? "done" : k === i ? "cur" : "" }))) : /* @__PURE__ */ react_default.createElement("span", null), /* @__PURE__ */ react_default.createElement("span", { className: "pill" }, t(mode))), /* @__PURE__ */ react_default.createElement("main", { className: "playmain" }, phase === "intro" && /* @__PURE__ */ react_default.createElement("div", { className: "intro" }, /* @__PURE__ */ react_default.createElement("div", { className: "cast" }, mission.who.map((id) => /* @__PURE__ */ react_default.createElement(Kid, { key: id, id, size: 88 }))), /* @__PURE__ */ react_default.createElement("span", { className: `pill p-${mission.pillar}` }, t("p_" + mission.pillar), " \xB7 ", bName), /* @__PURE__ */ react_default.createElement("h2", { lang: "en" }, mission.title.en), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(mission.title, lang), lang }), /* @__PURE__ */ react_default.createElement("div", { className: "prompt" }, /* @__PURE__ */ react_default.createElement("p", { className: "scenario", lang: "en" }, mission.scenario.en), /* @__PURE__ */ react_default.createElement(Listen, { text: mission.scenario.en, label: t("listen") }), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(mission.scenario, lang), lang })), /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement("h3", null, t("newWords")), /* @__PURE__ */ react_default.createElement("div", { className: "vocab" }, mission.vocab.map((w) => {
      const inner = /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("span", { className: "emo", "aria-hidden": "true" }, w.e), /* @__PURE__ */ react_default.createElement("b", { lang: "en" }, w.w), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(w, lang), lang }));
      return canSpeak ? /* @__PURE__ */ react_default.createElement("button", { type: "button", key: w.w, className: "word", onClick: () => speak(w.w), "aria-label": `${t("listen")}: ${w.w}` }, inner) : /* @__PURE__ */ react_default.createElement("div", { key: w.w, className: "word" }, inner);
    }))), /* @__PURE__ */ react_default.createElement("section", { className: "targetbox" }, /* @__PURE__ */ react_default.createElement("h3", null, t("weSay")), /* @__PURE__ */ react_default.createElement("p", { className: "fact", lang: "en" }, "\u201C", mission.target, "\u201D"), /* @__PURE__ */ react_default.createElement(Listen, { text: mission.target, label: t("listen"), big: true }), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(mission.targetHelp, lang), lang })), /* @__PURE__ */ react_default.createElement("p", { className: "goalline" }, /* @__PURE__ */ react_default.createElement("b", null, t("goal"), ":"), " ", loc(mission.objective, lang)), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn primary big", onClick: () => setPhase("steps") }, /* @__PURE__ */ react_default.createElement(Icon, { name: "play" }), t("startMission"))), phase === "steps" && /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("p", { className: "instr" }, t("i_" + step.t)), /* @__PURE__ */ react_default.createElement(Step, { key: i, step, mission, lang, t, little, solved, onSolved: solve })), phase === "reward" && /* @__PURE__ */ react_default.createElement(Reward, { ...{ mission, building, lang, t, practice, init, onExit, onBuild } })), phase === "steps" && solved && /* @__PURE__ */ react_default.createElement("footer", { className: "praisebar", role: "status" }, /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", { lang: "en" }, praise.current), lang !== "en" && /* @__PURE__ */ react_default.createElement(Sup2, { text: t("praise"), lang })), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn mint big", onClick: next, autoFocus: true }, i + 1 < steps.length ? t("next") : t("finish"), /* @__PURE__ */ react_default.createElement(Icon, { name: "next", size: 20 }))));
  }
  function Reward({ mission, building, lang, t, practice, init, onExit, onBuild }) {
    const canBuild = !practice && !init.placed;
    const newDeco = practice ? init.practiceBefore === 0 ? "flag" : init.practiceBefore === 1 ? "lights" : null : null;
    const sessionNow = init.session + (!practice && !init.wasDone ? 1 : 0);
    const showBreak = !practice && !init.wasDone && sessionNow >= 3;
    useEffect(() => {
      speak(mission.feedback.en);
    }, []);
    return /* @__PURE__ */ react_default.createElement("div", { className: "reward" }, /* @__PURE__ */ react_default.createElement("div", { className: "confetti", "aria-hidden": "true" }, Array.from({ length: 14 }, (_, k) => /* @__PURE__ */ react_default.createElement("i", { key: k, style: { "--k": k } }))), /* @__PURE__ */ react_default.createElement("h2", null, practice ? t("practiced") : t("missionDone")), /* @__PURE__ */ react_default.createElement("p", { className: "fact", lang: "en" }, mission.feedback.en), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(mission.feedback, lang), lang }), /* @__PURE__ */ react_default.createElement("section", { className: "lesson" }, /* @__PURE__ */ react_default.createElement("h3", null, t("cityLesson")), /* @__PURE__ */ react_default.createElement("p", { lang: "en" }, mission.lesson.en), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(mission.lesson, lang), lang })), canBuild && /* @__PURE__ */ react_default.createElement("section", { className: "permit" }, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: building.id, defaultColor: building.color, size: 120, title: loc(building.name, lang) }), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("h3", null, t("permit")), /* @__PURE__ */ react_default.createElement("p", { className: "fact", lang: "en" }, building.name.en), /* @__PURE__ */ react_default.createElement(Sup2, { text: sup(building.name, lang), lang }))), newDeco && /* @__PURE__ */ react_default.createElement("p", { className: "unlock" }, /* @__PURE__ */ react_default.createElement(Icon, { name: "star" }), t("decoUnlocked", { d: t("d_" + newDeco) })), showBreak && /* @__PURE__ */ react_default.createElement("p", { className: "breaknote" }, t("breakTime", { n: sessionNow })), /* @__PURE__ */ react_default.createElement("div", { className: "row center" }, canBuild && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn primary big", onClick: onBuild }, /* @__PURE__ */ react_default.createElement(Icon, { name: "hammer" }), t("buildNow")), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: canBuild ? "btn" : "btn primary big", onClick: onExit }, t("backCity"))));
  }

  // src/screens/Pages.jsx
  var Sup3 = ({ text, lang }) => text ? /* @__PURE__ */ react_default.createElement("p", { className: "sup", lang }, text) : null;
  var DEMO_PLOTS = {
    p0: { b: "library" },
    p2: { b: "culture" },
    p3: { b: "plaza", d: "flowers" },
    p4: { b: "home", d: "flowers" },
    p6: { b: "hospital" },
    p7: { b: "police" },
    p8: { b: "bakery", d: "lights" },
    p9: { b: "toyshop" },
    p10: { b: "park" },
    p5: { b: "center", d: "flag" }
  };
  function Welcome({ state, dispatch, t, lang, go }) {
    const [mode, setMode] = useState(state.mode);
    const begin = () => {
      dispatch({ type: "START", lang, mode });
      go("city");
    };
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen welcome" }, /* @__PURE__ */ react_default.createElement("div", { className: "welcome-art" }, /* @__PURE__ */ react_default.createElement(CityMap, { plots: DEMO_PLOTS, demo: true, title: "Little City Makers" })), /* @__PURE__ */ react_default.createElement("main", { className: "welcome-card" }, /* @__PURE__ */ react_default.createElement("h1", { className: "logo", "aria-label": "Little City Makers" }, /* @__PURE__ */ react_default.createElement("span", { className: "l1", "aria-hidden": "true" }, "Little"), /* @__PURE__ */ react_default.createElement("span", { className: "blocks", "aria-hidden": "true" }, "CITY".split("").map((ch, k) => /* @__PURE__ */ react_default.createElement("b", { key: k, className: `blk b${k}` }, ch))), /* @__PURE__ */ react_default.createElement("span", { className: "l3", "aria-hidden": "true" }, "Makers")), /* @__PURE__ */ react_default.createElement("p", { className: "tagline", lang: "en" }, "Learn. Build. Belong."), lang !== "en" && /* @__PURE__ */ react_default.createElement(Sup3, { text: t("tagline"), lang }), /* @__PURE__ */ react_default.createElement("fieldset", { className: "pick" }, /* @__PURE__ */ react_default.createElement("legend", null, t("chooseLang")), /* @__PURE__ */ react_default.createElement("div", { className: "seg" }, LANGS.map((l) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: l.id, className: l.id === lang ? "segbtn on" : "segbtn", "aria-pressed": l.id === lang, onClick: () => dispatch({ type: "LANG", lang: l.id }), lang: l.id }, l.label)))), /* @__PURE__ */ react_default.createElement("fieldset", { className: "pick" }, /* @__PURE__ */ react_default.createElement("legend", null, t("chooseAge")), /* @__PURE__ */ react_default.createElement("div", { className: "ages" }, ["little", "junior"].map((m) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: m, className: m === mode ? `agecard ${m} on` : `agecard ${m}`, "aria-pressed": m === mode, onClick: () => setMode(m) }, /* @__PURE__ */ react_default.createElement("b", null, t(m)), /* @__PURE__ */ react_default.createElement("span", { className: "agetag" }, t(m + "Age")), /* @__PURE__ */ react_default.createElement("small", null, t(m + "Desc")))))), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn primary big wide", onClick: begin }, /* @__PURE__ */ react_default.createElement(Icon, { name: "hammer" }), state.started ? t("continue") : t("start")), /* @__PURE__ */ react_default.createElement("p", { className: "fine" }, t("privacy"))));
  }
  function Missions({ state, t, lang, go, onPlay }) {
    const doneN = Object.keys(state.missions).length;
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen paper" }, /* @__PURE__ */ react_default.createElement(TopBar, { title: t("missionCenter"), onBack: () => go("city"), backLabel: t("city") }, /* @__PURE__ */ react_default.createElement("span", { className: "pill" }, t(state.mode))), /* @__PURE__ */ react_default.createElement("main", { className: "page" }, /* @__PURE__ */ react_default.createElement("div", { className: "progressline" }, /* @__PURE__ */ react_default.createElement(Meter, { value: doneN, max: MISSIONS.length, label: t("missionCenter") }), /* @__PURE__ */ react_default.createElement("span", null, t("missionsProgress", { n: doneN, total: MISSIONS.length }))), /* @__PURE__ */ react_default.createElement("div", { className: "cards" }, MISSIONS.map((m) => {
      const st = missionStatus(state, m);
      const b = BUILDINGS_BY_ID[m.building];
      return /* @__PURE__ */ react_default.createElement("article", { key: m.id, className: `mcard ${st}` }, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: b.id, defaultColor: b.color, size: 78, locked: st === "locked", title: loc(b.name, lang) }), /* @__PURE__ */ react_default.createElement("div", { className: "mbody" }, /* @__PURE__ */ react_default.createElement("div", { className: "tags" }, /* @__PURE__ */ react_default.createElement("span", { className: `pill p-${m.pillar}` }, t("p_" + m.pillar)), /* @__PURE__ */ react_default.createElement("span", { className: `status ${st}` }, st === "done" && /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Icon, { name: "check", size: 14 }), t("st_done")), st === "open" && t("st_new"), st === "locked" && /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(Icon, { name: "lock", size: 14 }), t("st_locked", { n: m.needs })))), /* @__PURE__ */ react_default.createElement("h3", { lang: "en" }, m.title.en), /* @__PURE__ */ react_default.createElement(Sup3, { text: sup(m.title, lang), lang }), /* @__PURE__ */ react_default.createElement("p", { className: "goalline" }, /* @__PURE__ */ react_default.createElement("b", null, t("goal"), ":"), " ", loc(m.objective, lang)), /* @__PURE__ */ react_default.createElement("p", { className: "where" }, loc(b.name, lang), " \xB7 ", m.age), st !== "locked" && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: st === "open" ? "btn primary" : "btn", onClick: () => onPlay(m.id) }, /* @__PURE__ */ react_default.createElement(Icon, { name: "play", size: 18 }), st === "open" ? t("play") : t("playAgain"))));
    }))));
  }
  function Achievements({ state, t, lang, go }) {
    const n = placedCount(state);
    const placed = placedMap(state);
    const done = MISSIONS.filter((m) => state.missions[m.id]);
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen paper" }, /* @__PURE__ */ react_default.createElement(TopBar, { title: t("achievements"), onBack: () => go("city"), backLabel: t("city") }), /* @__PURE__ */ react_default.createElement("main", { className: "page" }, /* @__PURE__ */ react_default.createElement("section", { className: "sheet growth" }, /* @__PURE__ */ react_default.createElement(Pip, { size: 64 }), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("h2", null, t("cityGrowth"), ": ", t("lv" + levelOf(n))), /* @__PURE__ */ react_default.createElement(Meter, { value: n, max: TOTAL_BUILDINGS, label: t("cityGrowth") }), /* @__PURE__ */ react_default.createElement("p", null, t("buildingsCount", { n, total: TOTAL_BUILDINGS }), " \xB7 ", t("missionsProgress", { n: done.length, total: MISSIONS.length })))), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("milestones")), /* @__PURE__ */ react_default.createElement("ul", { className: "badges" }, milestones(state).map((m) => /* @__PURE__ */ react_default.createElement("li", { key: m.id, className: m.on ? "badgeitem on" : "badgeitem" }, /* @__PURE__ */ react_default.createElement("span", { className: "medal" }, /* @__PURE__ */ react_default.createElement(Icon, { name: m.on ? "star" : "lock", size: 22 })), /* @__PURE__ */ react_default.createElement("span", null, t("ms_" + m.id)))))), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("missionsDone")), done.length === 0 ? /* @__PURE__ */ react_default.createElement("p", { className: "empty" }, t("noneYet")) : /* @__PURE__ */ react_default.createElement("ul", { className: "donelist" }, done.map((m) => /* @__PURE__ */ react_default.createElement("li", { key: m.id }, /* @__PURE__ */ react_default.createElement(Icon, { name: "check", size: 18 }), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", { lang: "en" }, m.title.en), /* @__PURE__ */ react_default.createElement(Sup3, { text: sup(m.title, lang), lang }), /* @__PURE__ */ react_default.createElement("small", { lang: "en" }, "\u201C", m.target, "\u201D")))))), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("buildingsUnlocked")), /* @__PURE__ */ react_default.createElement("div", { className: "bgrid" }, BUILDINGS.map((b) => {
      const unlocked = !!state.missions[b.mission];
      return /* @__PURE__ */ react_default.createElement("figure", { key: b.id, className: unlocked ? "bfig" : "bfig locked" }, /* @__PURE__ */ react_default.createElement(BuildingThumb, { id: b.id, defaultColor: b.color, size: 84, locked: !unlocked, title: loc(b.name, lang) }), /* @__PURE__ */ react_default.createElement("figcaption", null, loc(b.name, lang), /* @__PURE__ */ react_default.createElement("small", null, placed[b.id] ? t("onMap") : unlocked ? t("ready") : "")));
    })))));
  }
  var ENGLISH = ["listening", "speaking", "reading", "writing", "vocabulary"];
  var LIFE = ["polite", "kindness", "empathy", "responsibility", "safety", "courage", "culture", "thinking", "belonging"];
  function SkillRows({ keys, skills, t }) {
    const max = Math.max(4, ...keys.map((k) => skills[k] || 0));
    return /* @__PURE__ */ react_default.createElement("ul", { className: "skills" }, keys.map((k) => {
      const v2 = skills[k] || 0;
      return /* @__PURE__ */ react_default.createElement("li", { key: k }, /* @__PURE__ */ react_default.createElement("span", null, t("sk_" + k)), /* @__PURE__ */ react_default.createElement(Meter, { value: v2, max, label: t("sk_" + k) }), /* @__PURE__ */ react_default.createElement("small", null, v2 ? t("activities", { n: v2 }) : t("notYet")));
    }));
  }
  function Parent({ state, dispatch, t, lang, go, saved }) {
    const [ask, setAsk] = useState(false);
    const done = MISSIONS.filter((m) => state.missions[m.id]);
    const words = [...new Map(done.flatMap((m) => m.vocab).map((w) => [w.w, w])).values()];
    const n = placedCount(state);
    return /* @__PURE__ */ react_default.createElement("div", { className: "screen paper" }, /* @__PURE__ */ react_default.createElement(TopBar, { title: t("parentTitle"), onBack: () => go("city"), backLabel: t("city") }), /* @__PURE__ */ react_default.createElement("main", { className: "page" }, /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("overview")), /* @__PURE__ */ react_default.createElement("div", { className: "stats" }, /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", null, done.length, "/", MISSIONS.length), /* @__PURE__ */ react_default.createElement("span", null, t("missionsDone"))), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", null, n, "/", TOTAL_BUILDINGS), /* @__PURE__ */ react_default.createElement("span", null, t("cityGrowth"), ": ", t("lv" + levelOf(n)))), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", null, words.length), /* @__PURE__ */ react_default.createElement("span", null, t("words")))), /* @__PURE__ */ react_default.createElement("h3", null, t("modeLabel")), /* @__PURE__ */ react_default.createElement("div", { className: "seg" }, ["little", "junior"].map((m) => /* @__PURE__ */ react_default.createElement("button", { type: "button", key: m, className: state.mode === m ? "segbtn on" : "segbtn", "aria-pressed": state.mode === m, onClick: () => dispatch({ type: "MODE", mode: m }) }, t(m), " \xB7 ", t(m + "Age")))), /* @__PURE__ */ react_default.createElement("p", { className: "fine left" }, t("modeNote"))), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("engSkills")), /* @__PURE__ */ react_default.createElement(SkillRows, { keys: ENGLISH, skills: state.skills, t })), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("lifeSkills")), /* @__PURE__ */ react_default.createElement(SkillRows, { keys: LIFE, skills: state.skills, t })), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("missionsDone")), done.length === 0 ? /* @__PURE__ */ react_default.createElement("p", { className: "empty" }, t("noneYet")) : /* @__PURE__ */ react_default.createElement("ul", { className: "donelist" }, done.map((m) => /* @__PURE__ */ react_default.createElement("li", { key: m.id }, /* @__PURE__ */ react_default.createElement(Icon, { name: "check", size: 18 }), /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("b", null, loc(m.title, lang)), /* @__PURE__ */ react_default.createElement("small", null, loc(m.objective, lang)))))), done.length > 0 && /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("h3", null, t("sentences")), /* @__PURE__ */ react_default.createElement("ul", { className: "plainlist", lang: "en" }, done.map((m) => /* @__PURE__ */ react_default.createElement("li", { key: m.id }, m.target))), /* @__PURE__ */ react_default.createElement("h3", null, t("words")), /* @__PURE__ */ react_default.createElement("p", { className: "wordcloud", lang: "en" }, words.map((w) => /* @__PURE__ */ react_default.createElement("span", { key: w.w }, w.w))))), /* @__PURE__ */ react_default.createElement("section", { className: "sheet" }, /* @__PURE__ */ react_default.createElement("h2", null, t("aboutData")), /* @__PURE__ */ react_default.createElement("ul", { className: "plainlist" }, /* @__PURE__ */ react_default.createElement("li", null, saved ? t("savedOk") : t("savedNo")), /* @__PURE__ */ react_default.createElement("li", null, t("noPersonal")), /* @__PURE__ */ react_default.createElement("li", null, t("contentNote"))), ask ? /* @__PURE__ */ react_default.createElement("div", { className: "confirm", role: "alertdialog", "aria-label": t("reset") }, /* @__PURE__ */ react_default.createElement("p", null, t("resetAsk")), /* @__PURE__ */ react_default.createElement("div", { className: "row" }, /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn danger", onClick: () => {
      dispatch({ type: "RESET" });
      go("welcome");
    } }, t("resetYes")), /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: () => setAsk(false) }, t("cancel")))) : /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "btn", onClick: () => setAsk(true) }, t("reset")))));
  }

  // src/App.jsx
  var SCREENS = ["welcome", "city", "missions", "achievements", "parent"];
  function App({ boot }) {
    const [init] = useState(load);
    const [state, dispatch] = useReducer(reducer, boot?.state?.v === 1 ? boot.state : init.state);
    const [saved, setSaved] = useState(init.ok);
    const [screen, setScreen] = useState(() => SCREENS.includes(boot?.screen) ? boot.screen : state.started ? "city" : "welcome");
    const [play, setPlay] = useState(null);
    const [buildNext, setBuildNext] = useState(null);
    const [session, setSession] = useState(0);
    const t = useMemo(() => makeT(state.lang), [state.lang]);
    const live = useRef({ state, screen });
    live.current = { state, screen };
    useEffect(() => {
      setSaved(save(state));
    }, [state]);
    useEffect(() => {
      document.documentElement.lang = state.lang;
    }, [state.lang]);
    useEffect(() => {
      window.claude?.hot?.snapshot?.(() => live.current);
    }, []);
    const go = (name) => {
      setPlay(null);
      if (name !== "city") setBuildNext(null);
      setScreen(name);
    };
    const startMission = (missionId, practice = false) => {
      setPlay({ missionId, practice });
      setScreen("activity");
    };
    const common = { state, dispatch, t, lang: state.lang, go };
    if (screen === "activity" && play) {
      const mission = MISSIONS_BY_ID[play.missionId];
      const building = BUILDINGS_BY_ID[mission.building];
      return /* @__PURE__ */ react_default.createElement(
        MissionPlayer,
        {
          key: `${play.missionId}-${play.practice}-${state.mode}`,
          mission,
          building,
          mode: state.mode,
          lang: state.lang,
          t,
          practice: play.practice,
          wasDone: !!state.missions[mission.id],
          placed: !!placedMap(state)[building.id],
          practiceBefore: state.practice[building.id] || 0,
          session,
          onComplete: (skills) => {
            if (play.practice) dispatch({ type: "PRACTICE", building: building.id, skills });
            else {
              if (!state.missions[mission.id]) setSession((n) => n + 1);
              dispatch({ type: "MISSION_DONE", id: mission.id, skills });
            }
          },
          onExit: () => go(play.practice ? "city" : state.missions[mission.id] ? "city" : "missions"),
          onBuild: () => {
            setPlay(null);
            setBuildNext(building.id);
            setScreen("city");
          }
        }
      );
    }
    if (screen === "missions") return /* @__PURE__ */ react_default.createElement(Missions, { ...common, onPlay: (id) => startMission(id) });
    if (screen === "achievements") return /* @__PURE__ */ react_default.createElement(Achievements, { ...common });
    if (screen === "parent") return /* @__PURE__ */ react_default.createElement(Parent, { ...common, saved });
    if (screen === "city" || screen === "activity") {
      return /* @__PURE__ */ react_default.createElement(City, { ...common, key: buildNext || "city", initialBuild: buildNext, onPractice: (bId) => startMission(BUILDINGS_BY_ID[bId].mission, true) });
    }
    return /* @__PURE__ */ react_default.createElement(Welcome, { ...common });
  }

  // src/main.jsx
  var root = createRoot(document.getElementById("root"));
  var start = (boot) => root.render(/* @__PURE__ */ react_default.createElement(App, { boot }));
  var hot = window.claude?.hot;
  if (hot?.ready) hot.ready(start);
  else start(hot?.data ?? {});
})();
