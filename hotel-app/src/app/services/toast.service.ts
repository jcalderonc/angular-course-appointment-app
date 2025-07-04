import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private toastId = 0;

  getToasts() {
    return this.toasts$.asObservable();
  }

  showSuccess(message: string, duration: number = 3000) {
    this.addToast(message, 'success', duration);
  }

  showError(message: string, duration: number = 5000) {
    this.addToast(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 4000) {
    this.addToast(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 3000) {
    this.addToast(message, 'info', duration);
  }

  private addToast(message: string, type: Toast['type'], duration: number) {
    const toast: Toast = {
      id: ++this.toastId,
      message,
      type,
      duration
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.removeToast(toast.id), duration);
    }
  }

  removeToast(id: number) {
    const currentToasts = this.toasts$.value;
    this.toasts$.next(currentToasts.filter(toast => toast.id !== id));
  }
}