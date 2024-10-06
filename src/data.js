const audioData = [{
        id: 1,
        title: "Meeting Recording",
        datetime: "23/09/2024, 13:00",
        duration: "00:50",
        audioUrl: "src/assets/file_example_MP3_700KB.mp3",
        transcription: [{
                speaker: 'Speaker 1',
                timestamp: '00:00',
                text: 'Selamat pagi, Pak. Apa kabar hari ini?'
            },
            {
                speaker: 'Speaker 2',
                timestamp: '00:06',
                text: 'Pagi, Dok. Saya agak pusing dan perut terasa kembung sejak semalam.'
            },
            {
                speaker: 'Speaker 1',
                timestamp: '00:15',
                text: 'Baik, saya akan cek dulu. Tekanan darah Bapak normal, tetapi ada sedikit kembung di bagian perut. Saya curiga ini karena asam lambung atau gastritis. Apa Bapak punya riwayat masalah lambung sebelumnya?'
            },
            {
                speaker: 'Speaker 2',
                timestamp: '00:55',
                text: 'Baik, saya akan cek dulu. Tekanan darah Bapak normal, tetapi ada sedikit kembung di bagian perut. Saya curiga ini karena asam lambung atau gastritis. Apa Bapak punya riwayat masalah lambung sebelumnya?'
            },
            {
                speaker: 'Speaker 1',
                timestamp: '00:15',
                text: 'Baik, saya akan cek dulu. Tekanan darah Bapak normal, tetapi ada sedikit kembung di bagian perut. Saya curiga ini karena asam lambung atau gastritis. Apa Bapak punya riwayat masalah lambung sebelumnya?'
            },
            {
                speaker: 'Speaker 2',
                timestamp: '00:55',
                text: 'Baik, saya akan cek dulu. Tekanan darah Bapak normal, tetapi ada sedikit kembung di bagian perut. Saya curiga ini karena asam lambung atau gastritis. Apa Bapak punya riwayat masalah lambung sebelumnya?'
            }
        ]
    },
    {
        id: 2,
        title: "Interview Recording",
        datetime: "20/09/2024, 15:30",
        duration: "01:15",
        audioUrl: "src/assets/file_example_MP3_700KB.mp3",
        transcription: [{
                speaker: 'Speaker 1',
                timestamp: '00:00',
                text: 'Can you tell me about your previous work experience?'
            },
            {
                speaker: 'Speaker 2',
                timestamp: '00:05',
                text: 'Sure. I have worked in the tech industry for over 10 years, primarily focusing on software development and project management.'
            }
        ]
    },
    {
        id: 3,
        title: "Lecture Recording",
        datetime: "19/09/2024, 10:00",
        duration: "02:30",
        audioUrl: "src/assets/file_example_MP3_700KB.mp3",
        transcription: [{
                speaker: 'Speaker 1',
                timestamp: '00:00',
                text: 'Good morning everyone. Today, we will be discussing the basics of machine learning.'
            },
            {
                speaker: 'Speaker 2',
                timestamp: '00:10',
                text: 'What are the key components of a machine learning model?'
            }
        ]
    }
];

export default audioData;