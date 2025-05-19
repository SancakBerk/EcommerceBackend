import { Module } from '@nestjs/common';
import { OngoingItemsService } from './ongoing-items.service';
import { OngoingItemsController } from './ongoing-items.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [OngoingItemsController],
  providers: [OngoingItemsService],
})
export class OngoingItemsModule {}
