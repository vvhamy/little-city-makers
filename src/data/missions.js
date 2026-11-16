// Mission content. Fixed, pre-written and local: no AI generates anything at runtime.
//
// Mission schema
//   id, building (reward permit / city location), pillar, age, needs (buildings placed before it opens),
//   skills (life-skill keys credited on completion), who (character shown in the intro),
//   title, objective, scenario, lesson, feedback  -> { en, vi, ko }
//   vocab [{ w, e, vi, ko }], target (English sentence), targetHelp { vi, ko }
//   steps { little: [...], junior: [...] }   completion = every step solved
//
// Step types (see activities/steps.jsx)
//   pick   { q, h?, passage?, opts, a }      opts: vocab word | [emoji, label] | sentence
//   order  { q?, words, pic?, letters? }     tap tiles in order
//   type   { pre, post, a, pic? }            type the missing word
//   choice { who, story, opts:[{ l, good, out }] }   explore choices, see consequences
//   sort   { bins, items }                   drag or tap items into bins
//   learn  { cards:[{ e, s, h? }] }          look-and-listen fact cards
//   say    { s }                             speaking prompt (not recorded, not checked)

const s = (en, vi, ko) => ({ en, vi, ko });
const h = (vi, ko) => ({ vi, ko });
const v = (w, e, vi, ko) => ({ w, e, vi, ko });

export const MISSIONS = [
  {
    id: 'm-home', building: 'home', pillar: 'english', age: '4–10', needs: 0, skills: ['belonging'], who: ['mai'],
    title: s('My Little Home', 'Ngôi nhà nhỏ của mình', '나의 작은 집'),
    objective: s('Learn home words and say “This is my home.”', 'Học từ về ngôi nhà và nói “This is my home.”', '집에 관한 단어를 배우고 “This is my home.”이라고 말해요.'),
    scenario: s('The land is empty and Mai needs a home. Learn the words to build it!', 'Mảnh đất còn trống và Mai cần một ngôi nhà. Hãy học từ mới để xây nhà nhé!', '땅이 비어 있고 마이에게는 집이 필요해요. 단어를 배우고 집을 지어요!'),
    lesson: s('A home is a place where people care for each other.', 'Nhà là nơi mọi người quan tâm và chăm sóc lẫn nhau.', '집은 서로를 아끼고 돌보는 곳이에요.'),
    feedback: s('Great work! You can talk about your home.', 'Giỏi lắm! Bạn đã biết nói về ngôi nhà của mình.', '잘했어요! 이제 집에 대해 말할 수 있어요.'),
    vocab: [v('home', '🏠', 'nhà', '집'), v('door', '🚪', 'cửa', '문'), v('bed', '🛏️', 'giường', '침대'), v('family', '👨‍👩‍👧', 'gia đình', '가족'), v('key', '🔑', 'chìa khóa', '열쇠')],
    target: 'This is my home.', targetHelp: h('Đây là nhà của mình.', '여기는 우리 집이에요.'),
    steps: {
      little: [
        { t: 'pick', q: 'Where is the door?', h: h('Cái cửa ở đâu?', '문은 어디에 있나요?'), opts: ['door', 'bed', 'key'], a: 'door' },
        { t: 'pick', q: 'Who lives in a home? Find the family.', h: h('Ai sống trong nhà? Hãy tìm gia đình.', '집에는 누가 살까요? 가족을 찾아요.'), opts: ['family', 'key', 'bed'], a: 'family' },
        { t: 'order', q: 'Spell the word.', h: h('Ghép chữ thành từ.', '글자를 맞춰 단어를 만들어요.'), letters: true, pic: '🏠', words: ['h', 'o', 'm', 'e'] },
        { t: 'say', s: 'This is my home.' },
      ],
      junior: [
        { t: 'pick', q: 'We sleep in a ___.', h: h('Chúng ta ngủ trên ___.', '우리는 ___에서 자요.'), opts: ['bed', 'door', 'key'], a: 'bed' },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['This', 'is', 'my', 'home.'] },
        { t: 'type', pic: '👨‍👩‍👧', pre: 'My', post: 'lives in my home.', a: 'family' },
        { t: 'pick', passage: 'Mai lives in a little home. It has a blue door. Her family eats dinner together every evening.', q: 'What color is the door?', h: h('Cái cửa màu gì?', '문은 무슨 색인가요?'), opts: ['Blue', 'Red', 'Green'], a: 'Blue' },
        { t: 'say', s: 'This is my home. I live with my family.' },
      ],
    },
  },
  {
    id: 'm-bakery', building: 'bakery', pillar: 'english', age: '5–7', needs: 1, skills: ['polite'], who: ['sofia'],
    title: s('Welcome to the Bakery', 'Chào mừng đến tiệm bánh', '빵집에 오신 것을 환영해요'),
    objective: s('Practice food vocabulary and polite requests.', 'Luyện từ vựng về đồ ăn và lời đề nghị lịch sự.', '음식 단어와 공손하게 부탁하는 말을 연습해요.'),
    scenario: s('Sofia comes into the bakery. She wants to buy a cake.', 'Sofia bước vào tiệm bánh. Bạn ấy muốn mua một chiếc bánh kem.', '소피아가 빵집에 들어와요. 케이크를 사고 싶어 해요.'),
    lesson: s('Being polite helps people communicate respectfully.', 'Lịch sự giúp mọi người trò chuyện với sự tôn trọng.', '공손하게 말하면 서로 존중하며 이야기할 수 있어요.'),
    feedback: s('Wonderful! You used polite English.', 'Tuyệt vời! Bạn đã dùng tiếng Anh thật lịch sự.', '훌륭해요! 공손한 영어를 썼어요.'),
    vocab: [v('bread', '🍞', 'bánh mì', '빵'), v('cake', '🎂', 'bánh kem', '케이크'), v('cookie', '🍪', 'bánh quy', '쿠키'), v('milk', '🥛', 'sữa', '우유'), v('apple', '🍎', 'quả táo', '사과')],
    target: 'I would like a cake, please.', targetHelp: h('Cho mình một chiếc bánh kem ạ.', '케이크 하나 주세요.'),
    steps: {
      little: [
        { t: 'pick', q: 'Sofia wants a cake. Tap the cake.', h: h('Sofia muốn bánh kem. Hãy chạm vào bánh kem.', '소피아는 케이크를 원해요. 케이크를 눌러요.'), opts: ['cake', 'bread', 'apple'], a: 'cake' },
        { t: 'pick', q: 'Now she wants milk. Tap the milk.', h: h('Bây giờ bạn ấy muốn sữa. Hãy chạm vào sữa.', '이번에는 우유를 원해요. 우유를 눌러요.'), opts: ['cookie', 'milk', 'bread'], a: 'milk' },
        { t: 'order', q: 'Ask politely.', h: h('Hãy hỏi thật lịch sự.', '공손하게 부탁해요.'), words: ['I would like', 'a cake,', 'please.'] },
        { t: 'say', s: 'I would like a cake, please.' },
      ],
      junior: [
        { t: 'pick', q: 'Sofia says, “I would like some bread, please.” What does she want?', h: h('Sofia muốn mua gì?', '소피아는 무엇을 원하나요?'), opts: ['bread', 'cookie', 'milk'], a: 'bread' },
        { t: 'order', q: 'Build the polite sentence.', h: h('Sắp xếp thành câu lịch sự.', '공손한 문장을 만들어요.'), words: ['I', 'would', 'like', 'a', 'cake,', 'please.'] },
        { t: 'type', pic: '🍪', pre: 'I would like a', post: ', please.', a: 'cookie' },
        { t: 'pick', q: 'Which sentence is polite?', h: h('Câu nào lịch sự?', '어느 문장이 공손한가요?'), opts: ['I would like an apple, please.', 'Give me an apple.', 'Apple. Now.'], a: 'I would like an apple, please.' },
        { t: 'say', s: 'I would like a cake, please. Thank you!' },
      ],
    },
  },
  {
    id: 'm-library', building: 'library', pillar: 'english', age: '4–10', needs: 1, skills: ['thinking'], who: ['leo'],
    title: s('Story Time at the Library', 'Giờ kể chuyện ở thư viện', '도서관 이야기 시간'),
    objective: s('Read a short story and answer questions about it.', 'Đọc một câu chuyện ngắn và trả lời câu hỏi.', '짧은 이야기를 읽고 질문에 답해요.'),
    scenario: s('The city needs a place for books. Finish the reading challenge to open the library!', 'Thành phố cần một nơi để sách. Hãy hoàn thành thử thách đọc để mở thư viện!', '도시에 책을 둘 곳이 필요해요. 읽기 도전을 끝내고 도서관을 열어요!'),
    lesson: s('Books help us learn new things. In a library, we share books and take care of them.', 'Sách giúp chúng ta học điều mới. Ở thư viện, chúng ta dùng chung sách và giữ gìn sách.', '책은 새로운 것을 알려 줘요. 도서관에서는 책을 함께 쓰고 소중히 다뤄요.'),
    feedback: s('Well done! You are a book explorer.', 'Làm tốt lắm! Bạn là nhà thám hiểm sách.', '잘했어요! 책 탐험가가 됐어요.'),
    vocab: [v('book', '📕', 'quyển sách', '책'), v('library', '🏛️', 'thư viện', '도서관'), v('read', '👀', 'đọc', '읽다'), v('quiet', '🤫', 'yên lặng', '조용한'), v('story', '✨', 'câu chuyện', '이야기')],
    target: 'I like to read books.', targetHelp: h('Mình thích đọc sách.', '나는 책 읽는 것을 좋아해요.'),
    steps: {
      little: [
        { t: 'pick', q: 'Tap the book.', h: h('Hãy chạm vào quyển sách.', '책을 눌러요.'), opts: ['book', ['⚽', 'ball'], ['🍎', 'apple']], a: 'book' },
        { t: 'pick', q: 'We are quiet in the library. Tap “quiet”.', h: h('Ở thư viện chúng ta giữ yên lặng. Hãy chạm vào “quiet”.', '도서관에서는 조용히 해요. “quiet”를 눌러요.'), opts: ['quiet', ['📣', 'loud']], a: 'quiet' },
        { t: 'order', q: 'Spell the word.', h: h('Ghép chữ thành từ.', '글자를 맞춰 단어를 만들어요.'), letters: true, pic: '📕', words: ['b', 'o', 'o', 'k'] },
        { t: 'say', s: 'I like to read books.' },
      ],
      junior: [
        { t: 'pick', passage: 'Leo goes to the library on Saturday. He finds a book about robots. He reads quietly at a table. Then he borrows the book and takes it home.', q: 'What is Leo’s book about?', h: h('Quyển sách của Leo nói về điều gì?', '레오의 책은 무엇에 관한 책인가요?'), opts: ['Robots', 'Animals', 'Space'], a: 'Robots' },
        { t: 'pick', passage: 'Leo goes to the library on Saturday. He finds a book about robots. He reads quietly at a table. Then he borrows the book and takes it home.', q: 'How does Leo read?', h: h('Leo đọc sách như thế nào?', '레오는 어떻게 책을 읽나요?'), opts: ['Quietly', 'Loudly', 'Quickly'], a: 'Quietly' },
        { t: 'pick', q: 'Why are people quiet in a library?', h: h('Vì sao mọi người giữ yên lặng trong thư viện?', '도서관에서는 왜 조용히 할까요?'), opts: ['So everyone can read and think.', 'Because the books are sleeping.', 'Because talking is always bad.'], a: 'So everyone can read and think.' },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['I', 'like', 'to', 'read', 'books.'] },
        { t: 'say', s: 'I like to read books about robots.' },
      ],
    },
  },
  {
    id: 'm-park', building: 'park', pillar: 'life', age: '4–10', needs: 1, skills: ['responsibility'], who: ['sofia'],
    title: s('Clean Up the Park', 'Dọn sạch công viên', '공원을 깨끗하게'),
    objective: s('Learn to care for shared spaces and sort trash.', 'Học cách giữ gìn không gian chung và phân loại rác.', '함께 쓰는 공간을 돌보고 쓰레기를 분리하는 법을 배워요.'),
    scenario: s('Sofia forgot her trash after a picnic. Let’s help her clean up the park!', 'Sofia quên dọn rác sau buổi dã ngoại. Cùng giúp bạn ấy dọn sạch công viên nhé!', '소피아가 소풍 뒤에 쓰레기를 깜빡했어요. 함께 공원을 치워요!'),
    lesson: s('The park belongs to everyone. We all help take care of it.', 'Công viên là của mọi người. Tất cả chúng ta cùng giữ gìn.', '공원은 모두의 것이에요. 우리 모두 함께 돌봐요.'),
    feedback: s('Thank you! The park is clean again.', 'Cảm ơn bạn! Công viên đã sạch trở lại.', '고마워요! 공원이 다시 깨끗해졌어요.'),
    vocab: [v('park', '🌳', 'công viên', '공원'), v('trash', '🗑️', 'rác', '쓰레기'), v('bin', '♻️', 'thùng rác', '쓰레기통'), v('paper', '📄', 'giấy', '종이'), v('clean', '✨', 'sạch', '깨끗한')],
    target: 'Let’s keep the park clean.', targetHelp: h('Chúng ta hãy giữ công viên sạch sẽ.', '공원을 깨끗하게 지켜요.'),
    steps: {
      little: [
        { t: 'pick', q: 'Where does trash go? Tap the bin.', h: h('Rác bỏ vào đâu? Hãy chạm vào thùng rác.', '쓰레기는 어디에 버릴까요? 쓰레기통을 눌러요.'), opts: ['bin', ['🌼', 'flower'], ['🦆', 'duck']], a: 'bin' },
        { t: 'sort', q: 'Put the trash in the right bin.', h: h('Bỏ rác vào đúng thùng.', '쓰레기를 알맞은 통에 넣어요.'),
          bins: [{ id: 'paper', l: 'Paper', e: '📄', vi: 'Giấy', ko: '종이' }, { id: 'food', l: 'Food', e: '🍽️', vi: 'Thức ăn thừa', ko: '음식물' }],
          items: [{ e: '📰', l: 'newspaper', bin: 'paper' }, { e: '🍌', l: 'banana peel', bin: 'food' }, { e: '📦', l: 'box', bin: 'paper' }, { e: '🍎', l: 'apple core', bin: 'food' }] },
        { t: 'order', q: 'Say what we do.', h: h('Nói điều chúng ta làm.', '우리가 하는 일을 말해요.'), words: ['Let’s', 'clean', 'the park.'] },
        { t: 'say', s: 'Let’s keep the park clean.' },
      ],
      junior: [
        { t: 'sort', q: 'Sort the trash into three bins.', h: h('Phân loại rác vào ba thùng.', '쓰레기를 세 통에 나눠 담아요.'),
          bins: [{ id: 'paper', l: 'Paper', e: '📄', vi: 'Giấy', ko: '종이' }, { id: 'cans', l: 'Plastic & cans', e: '🥫', vi: 'Nhựa & lon', ko: '플라스틱·캔' }, { id: 'food', l: 'Food', e: '🍽️', vi: 'Thức ăn thừa', ko: '음식물' }],
          items: [{ e: '📰', l: 'newspaper', bin: 'paper' }, { e: '🥫', l: 'can', bin: 'cans' }, { e: '🍌', l: 'banana peel', bin: 'food' }, { e: '📦', l: 'box', bin: 'paper' }, { e: '🥤', l: 'plastic cup', bin: 'cans' }, { e: '🍎', l: 'apple core', bin: 'food' }] },
        { t: 'choice', who: ['sofia'], story: s('Sofia forgot her trash after her picnic. What can you say?', 'Sofia quên dọn rác sau buổi dã ngoại. Bạn có thể nói gì?', '소피아가 소풍 뒤에 쓰레기를 깜빡했어요. 뭐라고 말할까요?'),
          opts: [
            { l: 'Sofia, let’s clean up together.', good: true, out: s('Sofia smiles. “Thank you! I forgot.” You clean up in two minutes.', 'Sofia mỉm cười: “Cảm ơn bạn! Mình quên mất.” Hai bạn dọn xong chỉ trong hai phút.', '소피아가 웃어요. “고마워! 깜빡했어.” 둘이서 2분 만에 다 치웠어요.') },
            { l: 'Leave it. It is not my trash.', good: false, out: s('The trash stays in the park. Birds and dogs could eat it and get sick. Let’s try another idea.', 'Rác vẫn nằm trong công viên. Chim và chó có thể ăn phải rồi bị ốm. Mình thử ý khác nhé.', '쓰레기가 공원에 그대로 남아요. 새나 강아지가 먹고 아플 수 있어요. 다른 방법을 생각해 봐요.') },
            { l: 'You are so messy!', good: false, out: s('Sofia feels hurt, and the trash is still there. Kind words work better. Let’s try another idea.', 'Sofia thấy buồn, mà rác vẫn còn đó. Lời nói nhẹ nhàng sẽ hiệu quả hơn. Mình thử ý khác nhé.', '소피아는 마음이 상하고 쓰레기는 그대로예요. 다정한 말이 더 좋아요. 다른 방법을 생각해 봐요.') },
          ] },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['We', 'keep', 'the', 'park', 'clean.'] },
        { t: 'pick', q: 'Why do we sort trash?', h: h('Vì sao chúng ta phân loại rác?', '왜 쓰레기를 분리할까요?'), opts: ['So paper and cans can be used again.', 'So the bins look pretty.', 'So we have more trash.'], a: 'So paper and cans can be used again.' },
        { t: 'say', s: 'Let’s keep the park clean.' },
      ],
    },
  },
  {
    id: 'm-toy', building: 'toyshop', pillar: 'sel', age: '4–10', needs: 3, skills: ['kindness'], who: ['leo', 'amara'],
    title: s('Sharing at the Toy Shop', 'Chia sẻ ở cửa hàng đồ chơi', '장난감 가게에서 나누기'),
    objective: s('Practice taking turns and sharing with friends.', 'Luyện cách chơi lần lượt và chia sẻ với bạn.', '차례를 지키고 친구와 나누는 법을 연습해요.'),
    scenario: s('Leo and Amara both want to play with the same toy truck.', 'Leo và Amara đều muốn chơi cùng một chiếc xe tải đồ chơi.', '레오와 아마라가 같은 장난감 트럭을 가지고 놀고 싶어 해요.'),
    lesson: s('When we share and take turns, everyone gets a chance to play.', 'Khi chúng ta chia sẻ và chơi lần lượt, ai cũng có cơ hội được chơi.', '나누고 차례를 지키면 모두가 놀 수 있어요.'),
    feedback: s('Lovely! You helped two friends play fairly.', 'Hay lắm! Bạn đã giúp hai người bạn chơi công bằng.', '멋져요! 두 친구가 사이좋게 놀도록 도왔어요.'),
    vocab: [v('toy', '🧸', 'đồ chơi', '장난감'), v('share', '🤝', 'chia sẻ', '나누다'), v('turn', '🔄', 'lượt', '차례'), v('together', '👫', 'cùng nhau', '함께'), v('friend', '😊', 'bạn', '친구')],
    target: 'Let’s take turns.', targetHelp: h('Chúng mình chơi lần lượt nhé.', '우리 차례대로 하자.'),
    steps: {
      little: [
        { t: 'choice', who: ['leo', 'amara'], story: s('Leo and Amara want the same truck. What can they say?', 'Leo và Amara muốn cùng một chiếc xe tải. Các bạn có thể nói gì?', '레오와 아마라가 같은 트럭을 원해요. 뭐라고 말할 수 있을까요?'),
          opts: [
            { l: 'Let’s take turns.', good: true, out: s('Leo plays first. Then Amara plays. Both friends are happy!', 'Leo chơi trước. Sau đó đến Amara. Cả hai bạn đều vui!', '레오가 먼저 놀고, 다음에 아마라가 놀아요. 둘 다 기뻐요!') },
            { l: 'You can’t play.', good: false, out: s('Amara feels sad and left out. Let’s try another idea.', 'Amara thấy buồn vì bị bỏ ra ngoài. Mình thử ý khác nhé.', '아마라는 슬프고 혼자 남겨진 기분이에요. 다른 방법을 생각해 봐요.') },
            { l: 'Let’s play together.', good: true, out: s('They build a road and play together. What fun!', 'Hai bạn xây một con đường và chơi cùng nhau. Vui quá!', '둘이 길을 만들고 함께 놀아요. 정말 재미있어요!') },
          ] },
        { t: 'pick', q: 'Amara can play too. How does she feel?', h: h('Amara cũng được chơi. Bạn ấy cảm thấy thế nào?', '아마라도 놀 수 있어요. 기분이 어떨까요?'), opts: [['😊', 'happy'], ['😢', 'sad']], a: 'happy' },
        { t: 'order', q: 'Say it kindly.', h: h('Hãy nói thật nhẹ nhàng.', '다정하게 말해요.'), words: ['Let’s', 'take', 'turns.'] },
        { t: 'say', s: 'Let’s take turns.' },
      ],
      junior: [
        { t: 'choice', who: ['leo', 'amara'], story: s('Leo and Amara both want to play with the same toy truck. What can they say?', 'Leo và Amara đều muốn chơi cùng một chiếc xe tải đồ chơi. Các bạn có thể nói gì?', '레오와 아마라가 같은 장난감 트럭을 가지고 놀고 싶어 해요. 뭐라고 말할 수 있을까요?'),
          opts: [
            { l: 'Let’s take turns.', good: true, out: s('Leo plays first. Then Amara plays. Both friends are happy!', 'Leo chơi trước. Sau đó đến Amara. Cả hai bạn đều vui!', '레오가 먼저 놀고, 다음에 아마라가 놀아요. 둘 다 기뻐요!') },
            { l: 'You can’t play.', good: false, out: s('Amara feels sad and left out. Let’s try another idea.', 'Amara thấy buồn vì bị bỏ ra ngoài. Mình thử ý khác nhé.', '아마라는 슬프고 혼자 남겨진 기분이에요. 다른 방법을 생각해 봐요.') },
            { l: 'Let’s play together.', good: true, out: s('They build a road and play together. What fun!', 'Hai bạn xây một con đường và chơi cùng nhau. Vui quá!', '둘이 길을 만들고 함께 놀아요. 정말 재미있어요!') },
          ] },
        { t: 'choice', who: ['leo'], story: s('Amara is playing with the truck. Leo wants a turn. What can Leo do?', 'Amara đang chơi xe tải. Leo cũng muốn chơi. Leo có thể làm gì?', '아마라가 트럭을 가지고 놀고 있어요. 레오도 놀고 싶어요. 레오는 어떻게 하면 좋을까요?'),
          opts: [
            { l: 'Ask, “Can I have a turn when you finish?”', good: true, out: s('Amara says, “Sure! Two more minutes.” Asking kindly works.', 'Amara nói: “Được chứ! Thêm hai phút nữa nhé.” Hỏi nhẹ nhàng thật hiệu quả.', '아마라가 말해요. “그럼! 2분만 더.” 다정하게 물어보니 통했어요.') },
            { l: 'Grab the truck.', good: false, out: s('The truck falls and both friends are upset. Let’s try another idea.', 'Chiếc xe rơi xuống và cả hai bạn đều buồn. Mình thử ý khác nhé.', '트럭이 떨어지고 두 친구 모두 속상해요. 다른 방법을 생각해 봐요.') },
            { l: 'Wait and play with blocks first.', good: true, out: s('Leo builds a tower while he waits. Being patient helps.', 'Leo xếp một tòa tháp trong lúc chờ. Kiên nhẫn thật có ích.', '레오는 기다리는 동안 탑을 쌓아요. 참고 기다리면 도움이 돼요.') },
          ] },
        { t: 'order', q: 'Ask for a turn.', h: h('Hãy xin đến lượt.', '차례를 부탁해요.'), words: ['Can', 'I', 'have', 'a', 'turn,', 'please?'] },
        { t: 'pick', q: 'Why does taking turns help?', h: h('Vì sao chơi lần lượt lại tốt?', '차례를 지키면 왜 좋을까요?'), opts: ['Everyone gets a chance to play.', 'One person keeps the toy.', 'Nobody plays.'], a: 'Everyone gets a chance to play.' },
        { t: 'say', s: 'Let’s take turns. You can go first.' },
      ],
    },
  },
  {
    id: 'm-center', building: 'center', pillar: 'sel', age: '4–10', needs: 3, skills: ['empathy'], who: ['sofia'],
    title: s('A Friend Feels Sad', 'Khi bạn mình buồn', '친구가 슬플 때'),
    objective: s('Name feelings and choose a kind, supportive answer.', 'Gọi tên cảm xúc và chọn lời nói ân cần.', '감정의 이름을 말하고 다정하게 위로하는 말을 골라요.'),
    scenario: s('Sofia’s best friend moved to a new city. Sofia feels sad.', 'Bạn thân của Sofia đã chuyển đến một thành phố khác. Sofia cảm thấy buồn.', '소피아의 가장 친한 친구가 다른 도시로 이사 갔어요. 소피아는 슬퍼요.'),
    lesson: s('All feelings are okay. Kind words help a friend feel less alone.', 'Mọi cảm xúc đều bình thường. Lời nói ân cần giúp bạn bớt cô đơn.', '어떤 감정이든 괜찮아요. 다정한 말은 친구가 덜 외롭게 해 줘요.'),
    feedback: s('That was kind. You helped a friend feel better.', 'Bạn thật tử tế. Bạn đã giúp một người bạn thấy khá hơn.', '참 다정했어요. 친구의 마음이 나아지도록 도왔어요.'),
    vocab: [v('happy', '😊', 'vui', '기쁜'), v('sad', '😢', 'buồn', '슬픈'), v('angry', '😠', 'tức giận', '화난'), v('scared', '😨', 'sợ', '무서운'), v('hug', '🤗', 'cái ôm', '포옹')],
    target: 'I am here for you.', targetHelp: h('Mình ở đây với bạn.', '내가 곁에 있을게.'),
    steps: {
      little: [
        { t: 'pick', q: 'Sofia’s friend moved away. How does Sofia feel?', h: h('Bạn của Sofia chuyển đi rồi. Sofia cảm thấy thế nào?', '소피아의 친구가 이사 갔어요. 소피아의 기분은 어떨까요?'), opts: ['sad', 'happy', 'angry'], a: 'sad' },
        { t: 'choice', who: ['sofia'], story: s('What can you do for Sofia?', 'Bạn có thể làm gì cho Sofia?', '소피아를 위해 무엇을 할 수 있을까요?'),
          opts: [
            { l: 'Sit with her and say, “I am here.”', good: true, out: s('Sofia feels a little better. A friend is near.', 'Sofia thấy khá hơn một chút. Có bạn ở bên cạnh.', '소피아의 기분이 조금 나아졌어요. 곁에 친구가 있으니까요.') },
            { l: 'Laugh at her.', good: false, out: s('Sofia feels worse. Let’s try another idea.', 'Sofia thấy buồn hơn. Mình thử ý khác nhé.', '소피아는 더 속상해요. 다른 방법을 생각해 봐요.') },
            { l: 'Draw a picture with her for her friend.', good: true, out: s('Sofia smiles. She can send the picture to her friend!', 'Sofia mỉm cười. Bạn ấy có thể gửi bức tranh cho bạn mình!', '소피아가 웃어요. 그림을 친구에게 보낼 수 있어요!') },
          ] },
        { t: 'pick', q: 'Tap the happy face.', h: h('Hãy chạm vào khuôn mặt vui.', '기쁜 얼굴을 눌러요.'), opts: ['happy', 'scared', 'sad'], a: 'happy' },
        { t: 'say', s: 'I am here for you.' },
      ],
      junior: [
        { t: 'pick', passage: 'Sofia’s best friend moved to a new city last week. Today Sofia sits alone. She does not want to play.', q: 'How does Sofia feel?', h: h('Sofia cảm thấy thế nào?', '소피아의 기분은 어떤가요?'), opts: ['sad', 'happy', 'angry'], a: 'sad' },
        { t: 'pick', passage: 'Sofia’s best friend moved to a new city last week. Today Sofia sits alone. She does not want to play.', q: 'Why does Sofia feel sad?', h: h('Vì sao Sofia buồn?', '소피아는 왜 슬플까요?'), opts: ['She misses her friend.', 'She lost her toy.', 'She is hungry.'], a: 'She misses her friend.' },
        { t: 'choice', who: ['sofia'], story: s('What can you say to Sofia?', 'Bạn có thể nói gì với Sofia?', '소피아에게 뭐라고 말할까요?'),
          opts: [
            { l: 'I am sorry you miss your friend. Do you want to talk?', good: true, out: s('Sofia nods. Talking about feelings can help.', 'Sofia gật đầu. Nói ra cảm xúc có thể giúp mình nhẹ lòng hơn.', '소피아가 고개를 끄덕여요. 감정을 이야기하면 도움이 돼요.') },
            { l: 'Stop being sad.', good: false, out: s('Sofia still feels sad, and now she feels alone too. Feelings need time. Let’s try another idea.', 'Sofia vẫn buồn, và giờ còn thấy cô đơn nữa. Cảm xúc cần thời gian. Mình thử ý khác nhé.', '소피아는 여전히 슬프고 이제는 외롭기까지 해요. 감정에는 시간이 필요해요. 다른 방법을 생각해 봐요.') },
            { l: 'Would you like to write a letter to her together?', good: true, out: s('Sofia loves the idea. Friends can stay close, even far away.', 'Sofia rất thích ý tưởng này. Bạn bè vẫn có thể gần gũi dù ở xa.', '소피아가 정말 좋아해요. 멀리 있어도 친구와 가까이 지낼 수 있어요.') },
          ] },
        { t: 'order', q: 'Build the kind sentence.', h: h('Sắp xếp thành câu nói ân cần.', '다정한 문장을 만들어요.'), words: ['I', 'am', 'here', 'for', 'you.'] },
        { t: 'say', s: 'It is okay to feel sad. I am here for you.' },
      ],
    },
  },
  {
    id: 'm-hospital', building: 'hospital', pillar: 'life', age: '4–10', needs: 3, skills: ['courage'], who: ['amara'],
    title: s('Helpers at the Hospital', 'Những người giúp đỡ ở bệnh viện', '병원의 도우미들'),
    objective: s('Learn the word “hospital” and who helps us when we are sick.', 'Học từ “hospital” và biết ai giúp chúng ta khi bị ốm.', '“hospital”이라는 단어와 아플 때 도와주는 사람들을 배워요.'),
    scenario: s('Amara has a cold. Where can she go? The city needs a hospital!', 'Amara bị cảm. Bạn ấy có thể đi đâu? Thành phố cần một bệnh viện!', '아마라가 감기에 걸렸어요. 어디로 가야 할까요? 도시에 병원이 필요해요!'),
    lesson: s('Doctors and nurses are community helpers. It is brave to ask for help when we feel sick.', 'Bác sĩ và y tá là những người giúp đỡ cộng đồng. Biết nhờ giúp đỡ khi bị ốm là dũng cảm.', '의사와 간호사는 마을의 도우미예요. 아플 때 도움을 청하는 것은 용기 있는 일이에요.'),
    feedback: s('Well done! Now the city can care for sick people.', 'Làm tốt lắm! Giờ thành phố đã có nơi chăm sóc người ốm.', '잘했어요! 이제 도시가 아픈 사람들을 돌볼 수 있어요.'),
    vocab: [v('hospital', '🏥', 'bệnh viện', '병원'), v('doctor', '🧑‍⚕️', 'bác sĩ', '의사'), v('sick', '🤒', 'ốm', '아픈'), v('medicine', '💊', 'thuốc', '약'), v('ambulance', '🚑', 'xe cứu thương', '구급차')],
    target: 'The doctor helps sick people.', targetHelp: h('Bác sĩ giúp đỡ người ốm.', '의사는 아픈 사람들을 도와요.'),
    steps: {
      little: [
        { t: 'pick', q: 'Amara is sick. Where does she go? Tap the hospital.', h: h('Amara bị ốm. Bạn ấy đi đâu? Hãy chạm vào bệnh viện.', '아마라가 아파요. 어디로 갈까요? 병원을 눌러요.'), opts: ['hospital', ['🏫', 'school'], ['🏪', 'shop']], a: 'hospital' },
        { t: 'pick', q: 'Who helps sick people? Tap the doctor.', h: h('Ai giúp người ốm? Hãy chạm vào bác sĩ.', '누가 아픈 사람을 도와줄까요? 의사를 눌러요.'), opts: ['doctor', ['🧑‍🍳', 'cook'], ['🧑‍🚒', 'firefighter']], a: 'doctor' },
        { t: 'order', q: 'Spell the word.', h: h('Ghép chữ thành từ.', '글자를 맞춰 단어를 만들어요.'), letters: true, pic: '🤝', words: ['h', 'e', 'l', 'p'] },
        { t: 'say', s: 'The doctor helps people.' },
      ],
      junior: [
        { t: 'pick', q: 'Amara has a cold and feels sick. Who can help her?', h: h('Amara bị cảm và thấy mệt. Ai có thể giúp bạn ấy?', '아마라가 감기에 걸려 아파요. 누가 도와줄 수 있을까요?'), opts: ['doctor', ['🧑‍🍳', 'cook'], ['🧑‍🚒', 'firefighter']], a: 'doctor' },
        { t: 'type', pic: '🧑‍⚕️', pre: 'A', post: 'helps sick people.', a: 'doctor' },
        { t: 'pick', passage: 'The hospital is open day and night. Doctors and nurses work there. An ambulance brings people who need help fast.', q: 'When is the hospital open?', h: h('Bệnh viện mở cửa khi nào?', '병원은 언제 문을 여나요?'), opts: ['Day and night', 'Only in the morning', 'Only on Sunday'], a: 'Day and night' },
        { t: 'choice', who: ['amara'], story: s('Amara is a little scared of the doctor. What can you say?', 'Amara hơi sợ gặp bác sĩ. Bạn có thể nói gì?', '아마라는 의사 선생님이 조금 무서워요. 뭐라고 말할까요?'),
          opts: [
            { l: 'The doctor is here to help you. I will stay with you.', good: true, out: s('Amara takes a deep breath. She feels braver with a friend.', 'Amara hít một hơi thật sâu. Có bạn bên cạnh, bạn ấy thấy dũng cảm hơn.', '아마라가 숨을 크게 쉬어요. 친구가 있어서 더 용감해졌어요.') },
            { l: 'Don’t be a baby.', good: false, out: s('Amara feels worse. Being scared is okay. Let’s try another idea.', 'Amara thấy tệ hơn. Sợ là chuyện bình thường. Mình thử ý khác nhé.', '아마라는 더 속상해요. 무서워해도 괜찮아요. 다른 방법을 생각해 봐요.') },
            { l: 'It is okay to feel scared. You are brave.', good: true, out: s('Amara smiles a little. Kind words give her courage.', 'Amara khẽ mỉm cười. Lời nói ân cần tiếp thêm can đảm cho bạn ấy.', '아마라가 살짝 웃어요. 다정한 말이 용기를 줘요.') },
          ] },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['The', 'doctor', 'helps', 'sick', 'people.'] },
        { t: 'say', s: 'The doctor helps sick people.' },
      ],
    },
  },
  {
    id: 'm-police', building: 'police', pillar: 'life', age: '5–10', needs: 5, skills: ['safety'], who: ['joon'],
    title: s('Stay Safe, Ask for Help', 'Giữ an toàn, nhờ giúp đỡ', '안전하게, 도움을 청해요'),
    objective: s('Practice keeping private information private and going to a trusted grown-up.', 'Luyện cách giữ kín thông tin riêng và tìm đến người lớn đáng tin cậy.', '개인 정보를 지키고 믿을 수 있는 어른에게 가는 법을 연습해요.'),
    scenario: s('At the park, a grown-up Joon does not know asks, “What is your name? Where do you live?”', 'Ở công viên, một người lớn mà Joon không quen hỏi: “Cháu tên gì? Nhà cháu ở đâu?”', '공원에서 준이 모르는 어른이 물어요. “이름이 뭐니? 어디 사니?”'),
    lesson: s('Most people are kind. It is still smart to keep your name, address, school and phone number private. When you feel unsure, go to a grown-up you trust.', 'Hầu hết mọi người đều tốt bụng. Nhưng giữ kín tên, địa chỉ, trường học và số điện thoại vẫn là điều khôn ngoan. Khi thấy không chắc chắn, hãy tìm đến người lớn mà bạn tin tưởng.', '대부분의 사람들은 친절해요. 그래도 이름, 주소, 학교, 전화번호는 지키는 것이 현명해요. 확실하지 않을 때는 믿을 수 있는 어른에게 가요.'),
    feedback: s('Smart thinking! You know how to stay safe.', 'Suy nghĩ thật thông minh! Bạn đã biết cách giữ an toàn.', '똑똑해요! 안전을 지키는 법을 알았어요.'),
    vocab: [v('safe', '✅', 'an toàn', '안전한'), v('help', '🙋', 'giúp đỡ', '도움'), v('stop', '✋', 'dừng lại', '멈춰'), v('ask', '💬', 'hỏi', '묻다'), v('private', '🔒', 'riêng tư', '비밀(개인적인)')],
    target: 'I will ask a grown-up I trust.', targetHelp: h('Mình sẽ hỏi một người lớn mà mình tin tưởng.', '믿을 수 있는 어른에게 물어볼게요.'),
    steps: {
      little: [
        { t: 'choice', who: ['joon'], story: s('A grown-up Joon does not know asks, “Where do you live?” What can Joon do?', 'Một người lớn mà Joon không quen hỏi: “Nhà cháu ở đâu?” Joon có thể làm gì?', '준이 모르는 어른이 “어디 사니?” 하고 물어요. 준은 어떻게 하면 좋을까요?'),
          opts: [
            { l: 'Go to a grown-up I trust.', good: true, out: s('Joon walks to his dad. His dad can help.', 'Joon đi về phía bố. Bố có thể giúp bạn ấy.', '준은 아빠에게 가요. 아빠가 도와줄 수 있어요.') },
            { l: 'Tell them where I live.', good: false, out: s('Our address is private. We share it only with people our family trusts. Let’s try another idea.', 'Địa chỉ nhà là thông tin riêng. Chúng ta chỉ nói với những người mà gia đình tin tưởng. Mình thử ý khác nhé.', '집 주소는 개인 정보예요. 가족이 믿는 사람에게만 알려 줘요. 다른 방법을 생각해 봐요.') },
            { l: 'Say, “I need to ask my dad.”', good: true, out: s('Good choice. A grown-up Joon trusts can answer for him.', 'Lựa chọn tốt. Người lớn mà Joon tin tưởng có thể trả lời thay bạn ấy.', '좋은 선택이에요. 준이 믿는 어른이 대신 대답해 줄 수 있어요.') },
          ] },
        { t: 'pick', q: 'Who can help you? Tap a grown-up you trust.', h: h('Ai có thể giúp bạn? Hãy chạm vào người lớn mà bạn tin tưởng.', '누가 도와줄 수 있을까요? 믿을 수 있는 어른을 눌러요.'), opts: [['👨‍👧', 'my dad'], ['🧸', 'my teddy'], ['🐦', 'a bird']], a: 'my dad' },
        { t: 'order', q: 'Say the safe sentence.', h: h('Nói câu giữ an toàn.', '안전을 지키는 문장을 말해요.'), words: ['I will ask', 'a grown-up', 'I trust.'] },
        { t: 'say', s: 'I will ask a grown-up I trust.' },
      ],
      junior: [
        { t: 'choice', who: ['joon'], story: s('At the park, a grown-up Joon does not know asks, “What is your name? Where do you live?” What can Joon do?', 'Ở công viên, một người lớn mà Joon không quen hỏi: “Cháu tên gì? Nhà cháu ở đâu?” Joon có thể làm gì?', '공원에서 준이 모르는 어른이 “이름이 뭐니? 어디 사니?” 하고 물어요. 준은 어떻게 하면 좋을까요?'),
          opts: [
            { l: 'Say, “I need to ask my dad,” and walk to him.', good: true, out: s('Joon walks to his dad. A grown-up he trusts can decide what to share.', 'Joon đi về phía bố. Người lớn mà bạn ấy tin tưởng sẽ quyết định nên nói điều gì.', '준은 아빠에게 가요. 믿을 수 있는 어른이 무엇을 알려 줄지 정할 수 있어요.') },
            { l: 'Tell them his name and address.', good: false, out: s('A name and address are private. We share them only with people our family trusts. Let’s try another idea.', 'Tên và địa chỉ là thông tin riêng. Chúng ta chỉ nói với những người mà gia đình tin tưởng. Mình thử ý khác nhé.', '이름과 주소는 개인 정보예요. 가족이 믿는 사람에게만 알려 줘요. 다른 방법을 생각해 봐요.') },
            { l: 'Move away and find his teacher.', good: true, out: s('Joon finds his teacher. Asking for help is a strong choice.', 'Joon tìm thấy cô giáo. Nhờ giúp đỡ là một lựa chọn mạnh mẽ.', '준은 선생님을 찾아가요. 도움을 청하는 것은 멋진 선택이에요.') },
          ] },
        { t: 'pick', q: 'Which information is private?', h: h('Thông tin nào là riêng tư?', '어느 것이 개인 정보일까요?'), opts: ['My home address', 'My favorite color', 'My favorite animal'], a: 'My home address' },
        { t: 'choice', who: ['joon'], story: s('In an online game, a player Joon does not know writes, “What school do you go to?” What can Joon do?', 'Trong một trò chơi trực tuyến, một người chơi mà Joon không quen viết: “Bạn học trường nào?” Joon có thể làm gì?', '온라인 게임에서 준이 모르는 사람이 “어느 학교 다녀?” 하고 물어요. 준은 어떻게 하면 좋을까요?'),
          opts: [
            { l: 'Do not answer, and tell a parent.', good: true, out: s('Joon’s mom helps him block the player. Telling a grown-up was smart.', 'Mẹ giúp Joon chặn người chơi đó. Nói với người lớn là rất thông minh.', '엄마가 그 사람을 차단하도록 도와줘요. 어른에게 말한 것은 현명했어요.') },
            { l: 'Type the name of his school.', good: false, out: s('A school name is private too. Let’s try another idea.', 'Tên trường cũng là thông tin riêng. Mình thử ý khác nhé.', '학교 이름도 개인 정보예요. 다른 방법을 생각해 봐요.') },
          ] },
        { t: 'order', q: 'Build the safe sentence.', h: h('Sắp xếp thành câu giữ an toàn.', '안전을 지키는 문장을 만들어요.'), words: ['I', 'will', 'ask', 'a', 'grown-up', 'I', 'trust.'] },
        { t: 'say', s: 'I will ask a grown-up I trust.' },
      ],
    },
  },
  {
    id: 'm-tet', building: 'plaza', pillar: 'culture', age: '4–10', needs: 5, skills: ['culture'], who: ['mai'],
    title: s('Tết with Family', 'Tết bên gia đình', '가족과 함께하는 뗏'),
    objective: s('Discover how many Vietnamese families celebrate Tết, and say New Year wishes in English.', 'Khám phá cách nhiều gia đình Việt Nam đón Tết và nói lời chúc năm mới bằng tiếng Anh.', '베트남의 많은 가족이 뗏(설)을 어떻게 보내는지 알아보고, 영어로 새해 인사를 해요.'),
    scenario: s('Mai’s family is getting ready for Tết, the Lunar New Year in Vietnam. Help build a Festival Plaza for the celebration!', 'Gia đình Mai đang chuẩn bị đón Tết Nguyên đán của Việt Nam. Hãy giúp xây Quảng trường Lễ hội để cùng vui Tết!', '마이네 가족이 베트남의 음력 설인 뗏을 준비하고 있어요. 함께 축제 광장을 지어요!'),
    lesson: s('Families around the world welcome a new year in their own ways. We can be curious and respectful.', 'Các gia đình trên khắp thế giới đón năm mới theo cách riêng của mình. Chúng ta có thể tò mò tìm hiểu và tôn trọng.', '세계의 가족들은 저마다의 방식으로 새해를 맞아요. 궁금해하고 존중하는 마음을 가져요.'),
    feedback: s('Happy New Year! You learned about Tết.', 'Chúc mừng năm mới! Bạn đã hiểu thêm về Tết.', '새해 복 많이 받으세요! 뗏에 대해 배웠어요.'),
    vocab: [v('New Year', '🎆', 'năm mới', '새해'), v('family', '👨‍👩‍👧', 'gia đình', '가족'), v('lucky money', '🧧', 'tiền lì xì', '세뱃돈'), v('flower', '🌸', 'hoa', '꽃'), v('wish', '💌', 'lời chúc', '덕담')],
    target: 'Happy New Year! We visit our family.', targetHelp: h('Chúc mừng năm mới! Chúng mình đi thăm gia đình.', '새해 복 많이 받으세요! 우리는 가족을 찾아가요.'),
    steps: {
      little: [
        { t: 'learn', cards: [
          { e: '🌸', s: 'Tết is the New Year in Vietnam. Families decorate with flowers.', h: h('Tết là năm mới ở Việt Nam. Các gia đình trang trí nhà bằng hoa.', '뗏은 베트남의 설이에요. 가족들은 꽃으로 집을 꾸며요.') },
          { e: '👨‍👩‍👧', s: 'We visit our family.', h: h('Chúng mình đi thăm gia đình.', '우리는 가족을 찾아가요.') },
          { e: '🧧', s: 'Children get lucky money in red envelopes.', h: h('Trẻ em được nhận tiền lì xì trong phong bao đỏ.', '아이들은 빨간 봉투에 담긴 세뱃돈을 받아요.') },
        ] },
        { t: 'pick', q: 'At Tết, who do we visit?', h: h('Ngày Tết, chúng ta đi thăm ai?', '뗏에는 누구를 찾아갈까요?'), opts: [['👨‍👩‍👧', 'our family'], ['🤖', 'a robot'], ['🌙', 'the moon']], a: 'our family' },
        { t: 'pick', q: 'Tap the lucky money.', h: h('Hãy chạm vào tiền lì xì.', '세뱃돈을 눌러요.'), opts: ['lucky money', ['🎂', 'cake'], ['⚽', 'ball']], a: 'lucky money' },
        { t: 'order', q: 'Say the New Year wish.', h: h('Nói lời chúc năm mới.', '새해 인사를 해요.'), words: ['Happy', 'New', 'Year!'] },
        { t: 'say', s: 'Happy New Year! We visit our family.' },
      ],
      junior: [
        { t: 'learn', cards: [
          { e: '🎆', s: 'Tết is the Lunar New Year in Vietnam. People say, “Chúc mừng năm mới!” It means “Happy New Year!”', h: h('Tết là Tết Nguyên đán của Việt Nam. Mọi người nói: “Chúc mừng năm mới!”', '뗏은 베트남의 음력 설이에요. 사람들은 “쭉 믕 남 머이!”라고 인사해요. “새해 복 많이 받으세요”라는 뜻이에요.') },
          { e: '🌸', s: 'Before Tết, families clean and decorate their homes. Many families in the north have pink peach blossoms. Many in the south have yellow apricot blossoms.', h: h('Trước Tết, các gia đình dọn dẹp và trang trí nhà cửa. Nhiều gia đình miền Bắc chưng hoa đào, nhiều gia đình miền Nam chưng hoa mai.', '뗏 전에 가족들은 집을 청소하고 꾸며요. 북부의 많은 집은 분홍 복숭아꽃을, 남부의 많은 집은 노란 매화를 장식해요.') },
          { e: '🍚', s: 'Families cook together. Many make bánh chưng or bánh tét, which are sticky rice cakes.', h: h('Cả nhà cùng nấu ăn. Nhiều gia đình gói bánh chưng hoặc bánh tét.', '가족이 함께 요리해요. 많은 집에서 찹쌀로 만든 떡인 반쯩이나 반뗏을 만들어요.') },
          { e: '🧧', s: 'Children wish their grandparents good health. They receive lucky money in red envelopes.', h: h('Trẻ em chúc ông bà mạnh khỏe và được nhận lì xì trong phong bao đỏ.', '아이들은 할머니, 할아버지께 건강을 빌어 드리고, 빨간 봉투에 담긴 세뱃돈을 받아요.') },
        ] },
        { t: 'pick', q: 'What do children wish their grandparents at Tết?', h: h('Ngày Tết, trẻ em chúc ông bà điều gì?', '뗏에 아이들은 할머니, 할아버지께 무엇을 빌어 드리나요?'), opts: ['Good health', 'Good night', 'Goodbye'], a: 'Good health' },
        { t: 'pick', q: 'Why is Tết special for families?', h: h('Vì sao Tết đặc biệt với các gia đình?', '뗏은 왜 가족에게 특별할까요?'), opts: ['Families come together and share good wishes.', 'Everyone stays alone.', 'Nobody eats anything.'], a: 'Families come together and share good wishes.' },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['We', 'visit', 'our', 'family.'] },
        { t: 'choice', who: ['mai'], story: s('Mai asks, “How does your family welcome a new year?” Every answer is a good answer.', 'Mai hỏi: “Gia đình bạn đón năm mới như thế nào?” Câu trả lời nào cũng đúng.', '마이가 물어요. “너희 가족은 새해를 어떻게 맞이해?” 어떤 답이든 좋은 답이에요.'),
          opts: [
            { l: 'We eat a special meal.', good: true, out: s('“That sounds delicious!” says Mai. Every family has its own way.', '“Nghe ngon quá!” Mai nói. Mỗi gia đình có một cách riêng.', '“맛있겠다!” 마이가 말해요. 가족마다 저마다의 방식이 있어요.') },
            { l: 'We visit our family.', good: true, out: s('“We do that too!” says Mai. Families can be alike and different.', '“Nhà mình cũng vậy!” Mai nói. Các gia đình có điểm giống và cũng có điểm khác nhau.', '“우리도 그래!” 마이가 말해요. 가족들은 서로 닮기도 하고 다르기도 해요.') },
            { l: 'We do something else.', good: true, out: s('“I would love to hear about it,” says Mai. Every family has its own way.', '“Mình rất muốn nghe kể,” Mai nói. Mỗi gia đình có một cách riêng.', '“어떤 건지 듣고 싶어.” 마이가 말해요. 가족마다 저마다의 방식이 있어요.') },
          ] },
        { t: 'say', s: 'Happy New Year! We visit our family.' },
      ],
    },
  },
  {
    id: 'm-chuseok', building: 'culture', pillar: 'culture', age: '4–10', needs: 5, skills: ['culture'], who: ['joon'],
    title: s('Thankful at Chuseok', 'Biết ơn trong ngày Chuseok', '감사한 추석'),
    objective: s('Discover how many Korean families celebrate Chuseok, and say thank you in English.', 'Khám phá cách nhiều gia đình Hàn Quốc đón Chuseok và nói lời cảm ơn bằng tiếng Anh.', '한국의 많은 가족이 추석을 어떻게 보내는지 알아보고, 영어로 감사를 표현해요.'),
    scenario: s('Joon’s family is getting ready for Chuseok, a harvest holiday in Korea. Help build a Culture House to share the story!', 'Gia đình Joon đang chuẩn bị đón Chuseok, ngày lễ mùa thu hoạch ở Hàn Quốc. Hãy giúp xây Nhà Văn hóa để kể câu chuyện này!', '준이네 가족이 한국의 추수 명절인 추석을 준비하고 있어요. 이야기를 나눌 문화의 집을 지어요!'),
    lesson: s('Saying thank you for food, family and friends matters in every culture.', 'Nói lời cảm ơn vì có thức ăn, gia đình và bạn bè là điều quan trọng ở mọi nền văn hóa.', '음식과 가족, 친구에게 감사하는 마음은 어느 문화에서나 소중해요.'),
    feedback: s('Thank you! You learned about Chuseok.', 'Cảm ơn bạn! Bạn đã hiểu thêm về Chuseok.', '고마워요! 추석에 대해 배웠어요.'),
    vocab: [v('moon', '🌕', 'mặt trăng', '달'), v('harvest', '🌾', 'mùa thu hoạch', '추수'), v('thankful', '💛', 'biết ơn', '감사하는'), v('family', '👨‍👩‍👧', 'gia đình', '가족'), v('grandparents', '👵', 'ông bà', '할머니, 할아버지')],
    target: 'We celebrate Chuseok. We are thankful for our family.', targetHelp: h('Chúng mình đón Chuseok. Chúng mình biết ơn gia đình.', '우리는 추석을 지내요. 우리는 가족에게 감사해요.'),
    steps: {
      little: [
        { t: 'learn', cards: [
          { e: '🌕', s: 'Chuseok is a harvest holiday in Korea. The moon is big and round.', h: h('Chuseok là ngày lễ mùa thu hoạch ở Hàn Quốc. Trăng to và tròn.', '추석은 한국의 추수 명절이에요. 달이 크고 둥글어요.') },
          { e: '👨‍👩‍👧', s: 'Families come together.', h: h('Các gia đình sum họp.', '가족들이 한자리에 모여요.') },
          { e: '🌙', s: 'They make songpyeon. Songpyeon are rice cakes shaped like a half-moon.', h: h('Mọi người làm songpyeon, loại bánh gạo có hình bán nguyệt.', '송편을 빚어요. 송편은 반달 모양의 떡이에요.') },
        ] },
        { t: 'pick', q: 'Tap the moon.', h: h('Hãy chạm vào mặt trăng.', '달을 눌러요.'), opts: ['moon', ['☀️', 'sun'], ['⭐', 'star']], a: 'moon' },
        { t: 'pick', q: 'Who comes together at Chuseok?', h: h('Ai sum họp trong ngày Chuseok?', '추석에는 누가 모일까요?'), opts: ['family', ['🚗', 'cars'], ['🐧', 'penguins']], a: 'family' },
        { t: 'order', q: 'Say what we do.', h: h('Nói điều chúng ta làm.', '우리가 하는 일을 말해요.'), words: ['We', 'celebrate', 'Chuseok.'] },
        { t: 'say', s: 'We are thankful for our family.' },
      ],
      junior: [
        { t: 'learn', cards: [
          { e: '🌕', s: 'Chuseok is a big harvest holiday in Korea. It comes in autumn, when the moon is full.', h: h('Chuseok là ngày lễ lớn mừng mùa thu hoạch ở Hàn Quốc, diễn ra vào mùa thu khi trăng tròn.', '추석은 한국의 큰 추수 명절이에요. 가을에 보름달이 뜰 때 찾아와요.') },
          { e: '🌾', s: 'People say thank you for the food from the harvest and remember their family.', h: h('Mọi người cảm ơn vì có lương thực từ mùa màng và nhớ về gia đình, tổ tiên.', '사람들은 추수한 음식에 감사하고 가족과 조상을 기억해요.') },
          { e: '🌙', s: 'Families make songpyeon together. Songpyeon are rice cakes shaped like a half-moon.', h: h('Cả nhà cùng làm songpyeon, loại bánh gạo có hình bán nguyệt.', '가족이 함께 송편을 빚어요. 송편은 반달 모양의 떡이에요.') },
          { e: '🚆', s: 'Today, some families travel to their hometown. Others celebrate at home. Every family has its own way.', h: h('Ngày nay, có gia đình về quê, có gia đình đón lễ tại nhà. Mỗi gia đình có một cách riêng.', '요즘은 고향에 가는 가족도 있고, 집에서 보내는 가족도 있어요. 가족마다 저마다의 방식이 있어요.') },
        ] },
        { t: 'pick', q: 'What shape is songpyeon?', h: h('Bánh songpyeon có hình gì?', '송편은 무슨 모양인가요?'), opts: ['A half-moon', 'A square', 'A star'], a: 'A half-moon' },
        { t: 'pick', q: 'What are people thankful for at Chuseok?', h: h('Vào ngày Chuseok, mọi người biết ơn điều gì?', '추석에 사람들은 무엇에 감사하나요?'), opts: ['The harvest and their family', 'New toys', 'Rainy days'], a: 'The harvest and their family' },
        { t: 'order', q: 'Build the sentence.', h: h('Sắp xếp thành câu.', '문장을 만들어요.'), words: ['We', 'are', 'thankful', 'for', 'our', 'family.'] },
        { t: 'choice', who: ['joon'], story: s('Joon asks, “What are you thankful for?” Every answer is a good answer.', 'Joon hỏi: “Bạn biết ơn điều gì?” Câu trả lời nào cũng đúng.', '준이 물어요. “너는 무엇에 감사해?” 어떤 답이든 좋은 답이에요.'),
          opts: [
            { l: 'I am thankful for my family.', good: true, out: s('“Me too,” says Joon. Saying thank you makes hearts warm.', '“Mình cũng vậy,” Joon nói. Lời cảm ơn làm ấm lòng mọi người.', '“나도 그래.” 준이 말해요. 고맙다는 말은 마음을 따뜻하게 해요.') },
            { l: 'I am thankful for my friends.', good: true, out: s('“Friends are special,” says Joon. Saying thank you makes hearts warm.', '“Bạn bè thật đặc biệt,” Joon nói. Lời cảm ơn làm ấm lòng mọi người.', '“친구는 소중해.” 준이 말해요. 고맙다는 말은 마음을 따뜻하게 해요.') },
            { l: 'I am thankful for good food.', good: true, out: s('“Yum!” says Joon. Many people worked to grow that food.', '“Ngon quá!” Joon nói. Rất nhiều người đã vất vả để làm ra thức ăn ấy.', '“맛있겠다!” 준이 말해요. 그 음식을 기르려고 많은 사람이 애썼어요.') },
          ] },
        { t: 'say', s: 'We celebrate Chuseok. We are thankful for our family.' },
      ],
    },
  },
];

export const MISSIONS_BY_ID = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));
