import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe, UsePipes, HttpCode, Render } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './items.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}


  @Get()
  @Render('item.ejs')
  async findAll() {
    const result_1 = await this.itemService.findAll();
    return result_1 ? { views: result_1 } : { views: [] };
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }
  
  @Get('/create')
  @Render('create-item.ejs')
  rootsss() {
    return {};
  }
  @Post('/create')
  @HttpCode(200) 
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(@Body() createitemDto: CreateItemDto,@UploadedFile() file: Express.Multer.File) {
    createitemDto.image = file.filename;
    console.log(createitemDto)
    return this.itemService.create(createitemDto);
  }
  
    

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
