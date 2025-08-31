import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tolbar',
  templateUrl: './tolbar.component.html',
  styleUrls: ['./tolbar.component.scss']
})
export class TolbarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '400px',
      height: 'auto',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}

// Dialog component with proper structure
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <mat-card class="login-card">
    <mat-card-header>
        <mat-card-title>Litige</mat-card-title>
        <mat-card-subtitle>Déposer un litige</mat-card-subtitle>
        <span class="time-label"></span>
    </mat-card-header>
    <mat-card-content>

        <!-- Client ID (disabled) -->
        <mat-form-field appearance="outline" class="login">
          <mat-label>Client ID</mat-label>
          <input matInput  name="clientId" disabled>
          <mat-icon matSuffix>person</mat-icon>
        </mat-form-field>

        <!-- Invoice ID (disabled) -->
        <mat-form-field appearance="outline" class="login">
          <mat-label>Invoice ID</mat-label>
          <input matInput  name="invoice_id" disabled>
          <mat-icon matSuffix>receipt</mat-icon>
        </mat-form-field>

        <!-- Status -->
        <mat-form-field appearance="outline" class="login">
          <mat-label>Status</mat-label>
          <mat-select name="status" required>
            <mat-option value="open">Open</mat-option>
            <mat-option value="investigating">Investigating</mat-option>
            <mat-option value="in_court">In court</mat-option>
            <mat-option value="resolved">Resolved</mat-option>
          </mat-select>
          <mat-error >Status is required.</mat-error>
        </mat-form-field>

        <!-- Description -->
        <mat-form-field appearance="outline" class="login">
          <mat-label>Description</mat-label>
          <textarea matInput  name="description" required></textarea>
          <mat-icon matSuffix>description</mat-icon>
          <mat-error >Description is required.</mat-error>
        </mat-form-field>


      


        <button mat-raised-button color="primary" >
          Déposer le litige
        </button>
    </mat-card-content>
</mat-card>
  `,
  styles: [`
    .dialog-container {
      min-width: 300px;
      padding: 0;
    }
    
    h2[mat-dialog-title] {
      margin: 0 0 20px 0;
      font-size: 1.5em;
      color: #333;
    }
    
    mat-dialog-content {
      margin: 0 0 20px 0;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .full-width {
      width: 100%;
      margin-top: 15px;
    }
    
    mat-dialog-actions {
      margin: 0;
      padding: 0;
    }
    
    button {
      margin-left: 8px;
    }
  `]
})
export class DialogElementsExampleDialog {
  inputValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({
      result: 'saved',
      inputValue: this.inputValue
    });
  }
}