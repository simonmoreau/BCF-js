import {BcfReader} from "../src";
import * as fs from "fs/promises";
import {describe, expect, test} from '@jest/globals';

describe('Reader module module', () => {

    test('Read BCF file', async () => {
      const file = await fs.readFile("./test-data/MaximumInformation.bcf");
      const reader = new BcfReader();
      await reader.read(file);
  
      reader.topics.forEach(async (topic) => {
  
          expect(topic.markup).toBeDefined()
          
          if (topic.markup?.topic.title == 'Maximum Content')
          {
            expect(topic.viewpoints.length).toBeGreaterThan(0)
            if(topic.viewpoints.length > 0){
                expect(topic.viewpoints[0].perspective_camera).toBeDefined()
    
                const v = topic?.markup?.viewpoints;
    
                expect(v).toBeDefined();
    
                if(!v) return;

                var imageArrayBuffer : ArrayBuffer | undefined = await topic.getViewpointSnapshot(v[0])

                expect(imageArrayBuffer).toBeDefined()

            }
          }
      })
    });
  });

