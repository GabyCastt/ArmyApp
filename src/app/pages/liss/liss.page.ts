import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  ToastController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  flower,
  musicalNotes,
  trophy,
  heart,
  star,
  arrowForward,
} from 'ionicons/icons';

@Component({
  selector: 'app-liss',
  templateUrl: './liss.page.html',
  styleUrls: ['./liss.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
  ],
})
export class LissPage implements OnInit {
  currentGame: number = 1;
  pieces: any[] = [];
  dragIndex: number | null = null;

  // ===== Juego 1: Adivina la Palabra =====
  words = ['KOO', 'FLANDECOCO', 'LISS', 'TINKERBELL', 'BTS'];
  currentWord: string = '';
  guessedWord: string[] = [];
  wrongGuesses: number = 0;
  maxWrong: number = 5;
  letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  // ===== Juego 2: Rompecabezas =====
  puzzleImages = [
    'assets/Koolisss.jpg',
    'assets/kooLis2.jpg',
    'assets/kooLis3.jpg',
  ];
  currentPuzzleImg: string = '';
  currentPuzzleIndex: number = 0;

  // ===== Juego 3: Memoria =====
  cardFlipped: boolean[] = [];
  cardIcons: string[] = [];
  flippedCards: number[] = [];
  matchedPairs: number = 0;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    addIcons({ flower, musicalNotes, trophy, heart, star, arrowForward });
    this.createPuzzle();
  }

  ngOnInit() {
    this.startWordGame();
    this.shuffleCards();
  }
  skipGame() {
    if (this.currentGame === 1) {
      // Saltar al juego 2 (rompecabezas)
      this.currentGame = 2;
      this.currentPuzzleIndex = 0;
      this.currentPuzzleImg = this.puzzleImages[this.currentPuzzleIndex];
      this.createPuzzle(this.currentPuzzleImg);
      this.showToast('Saltado al rompecabezas', 'primary');
    } else if (this.currentGame === 2) {
      // Saltar al juego 3 (memoria)
      this.currentGame = 3;
      this.shuffleCards();
      this.showToast('Saltado al juego de memoria', 'primary');
    } else if (this.currentGame === 3) {
      // Saltar al final
      this.skipToEnd();
    }
  }

  skipToEnd() {
    this.currentGame = 4;
    this.showToast('¡Has llegado al final!', 'success');
  }

  // ===== Juego 1: Adivina la Palabra =====
  startWordGame() {
    this.currentWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    this.guessedWord = Array(this.currentWord.length).fill('_');
    this.wrongGuesses = 0;
  }

  guessLetter(letter: string) {
    if (this.guessedWord.includes(letter)) return;

    if (this.currentWord.includes(letter)) {
      this.currentWord.split('').forEach((char, i) => {
        if (char === letter) this.guessedWord[i] = letter;
      });
      if (!this.guessedWord.includes('_')) {
        this.showToast('¡Palabra completada! 💜', 'success');
        setTimeout(() => {
          this.currentGame = 2;

          // Inicia el primer puzzle
          this.currentPuzzleIndex = 0;
          this.currentPuzzleImg = this.puzzleImages[this.currentPuzzleIndex];
          this.createPuzzle(this.currentPuzzleImg);
        }, 1000);
      }
    } else {
      this.wrongGuesses++;
      if (this.wrongGuesses >= this.maxWrong) {
        this.showAlert('Juego terminado', `La palabra era ${this.currentWord}`);
        setTimeout(() => this.startWordGame(), 1500);
      }
    }
  }

  // ===== Juego 2: Rompecabezas =====
  createPuzzle(image?: string) {
    const baseImg = image || this.currentPuzzleImg || this.puzzleImages[0];
    const rows = 3;
    const cols = 3;

    this.pieces = [];
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.pieces.push({
          id: index,
          img: baseImg,
          backgroundPosition: `${(col / (cols - 1)) * 100}% ${
            (row / (rows - 1)) * 100
          }%`,
        });
        index++;
      }
    }

    // Mezclar piezas
    this.pieces = this.pieces.sort(() => Math.random() - 0.5);
  }

  onDragStart(event: DragEvent, index: number) {
    this.dragIndex = index;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, dropIndex: number) {
    event.preventDefault();
    if (this.dragIndex !== null && this.dragIndex !== dropIndex) {
      [this.pieces[this.dragIndex], this.pieces[dropIndex]] = [
        this.pieces[dropIndex],
        this.pieces[this.dragIndex],
      ];
    }
    this.dragIndex = null;
  }

  shufflePuzzle() {
    this.pieces = this.pieces.sort(() => Math.random() - 0.5);
  }

  checkPuzzleComplete() {
    const solved = this.pieces.every((p, index) => p.id === index);
    if (solved) {
      this.showToast('¡Rompecabezas completado! 🎉', 'success');

      if (this.currentPuzzleIndex < this.puzzleImages.length - 1) {
        // Avanza al siguiente puzzle
        this.currentPuzzleIndex++;
        setTimeout(() => {
          this.currentPuzzleImg = this.puzzleImages[this.currentPuzzleIndex];
          this.createPuzzle(this.currentPuzzleImg);
        }, 1000);
      } else {
        // Todos los puzzles completados
        setTimeout(() => (this.currentGame = 3), 1000);
      }
    } else {
      this.showToast('Aún no está completo 💜', 'warning');
    }
  }

  // ===== Juego 3: Memoria =====
  shuffleCards() {
    const icons = [
      'heart',
      'star',
      'flower',
      'trophy',
      'musical-notes',
      'heart',
      'star',
      'flower',
      'trophy',
      'musical-notes',
    ];
    this.cardIcons = icons.sort(() => Math.random() - 0.5);
    this.cardFlipped = Array(this.cardIcons.length).fill(false);
    this.flippedCards = [];
    this.matchedPairs = 0;
  }

  flipCard(index: number) {
    if (this.cardFlipped[index] || this.flippedCards.length >= 2) return;
    this.cardFlipped[index] = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      const [first, second] = this.flippedCards;

      if (this.cardIcons[first] === this.cardIcons[second]) {
        this.matchedPairs++;
        this.flippedCards = [];

        if (this.matchedPairs === this.cardIcons.length / 2) {
          this.showToast('¡Juego de memoria completado! 🎉', 'success');
          setTimeout(() => {
            this.showAlert(
              '¡Felicidades!',
              'Has completado todos los juegos Liss -`♡´-'
            );
            this.currentGame = 4;
          }, 1000);
        }
      } else {
        setTimeout(() => {
          this.cardFlipped[first] = false;
          this.cardFlipped[second] = false;
          this.flippedCards = [];
        }, 1000);
      }
    }
  }

  // ===== Utilidades =====
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    alert.present();
  }

  // Reiniciar todo
  restartGames() {
    this.currentGame = 1;
    this.startWordGame();
    this.shuffleCards();
  }
}
